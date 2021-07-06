const express = require('express');
const router = express.Router();
const {
  getAll,
  getAllFacet,
  addOne,
  addAny,
  getById,
  getBySales,
  getBySalesWithOperator,
  getBySalesRange,
  getByKeyword,
  addKeywords,
  addKeyword,
  getByCommentUser,
  deleteById,
  getSalesFreq,
  getCommentByDate
} = require('./snippets.model');

router.get(
  "/",
  async (req, res)=>{
    try{
      console.log(req.user);
      let allowed = req.user.roles.indexOf("useradmin");
      if (allowed >= 0){
        let rows = await getAll();
        res.status(200).json(rows);
      } else {
        res.status(401).json({"msg":"No tiene privilegios"});
      }
    }catch(ex){
      res.status(500).json({"msg":"Error"});
    }
  }
);

router.get(
  "/facet/:page/:size",
  async (req, res) => {
    try {
      let {page, size} = req.params;
      page = parseInt(page);
      size = parseInt(size);
      let result = await getAllFacet(page, size);
      res.status(200).json({...result, page, size});
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/aggregate/sales",
  async (req, res) => {
    try {
      let result = await getSalesFreq();
      res.status(200).json(result);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/byid/:id",
  async (req, res)=>{
    try{
      let {id} = req.params;
      let row = await getById(id);
      res.status(200).json(row);
    }catch(ex){
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/commentsbydate",
  async (req, res)=>{
    try{
      let rows = await getCommentByDate();
      res.status(200).json(rows);
    } catch (ex) {
      res.status(500).json({"msg":"Error!"})
    }
  }
);

router.get(
  "/bysales/:sales",
  async (req, res) => {
    try {
      let { sales } = req.params;
      let _sales = parseInt(sales);
      let rows = await getBySales(_sales);
      res.status(200).json(rows);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/bysales/:operator/:sales",
  async (req, res) => {
    try {
      let { sales, operator } = req.params;
      let _sales = parseInt(sales);
      let rows = await getBySalesWithOperator(_sales, operator);
      res.status(200).json(rows);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/bysales/range/:ll/:ul/:ex",
  async (req, res) => {
    try {
      let { ll, ul, ex } = req.params;
      let _ll = parseInt(ll);
      let _ul = parseInt(ul);
      let _ex = parseInt(ex) && true;
      let rows = await getBySalesRange(_ll, _ul, _ex);
      res.status(200).json(rows);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/bykeyword/:keyword",
  async (req, res) => {
    try {
      let { keyword } = req.params;
      let rows = await getByKeyword(keyword);
      res.status(200).json(rows);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/bycommentemail/:email",
  async (req, res)=>{
    try{
      const {email} = req.params;
      let rows = await getByCommentUser(email);
      res.status(200).json(rows);
    }catch(ex){
      console.log(ex);
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.post(
  "/new",
  async (req, res)=>{
    try{
      let {name, snippet} = req.body;
      let docInserted = await addOne(name, snippet, req.user._id);
      res.status(200).json(docInserted);
    }catch(ex){
      res.status(500).json({"msg":"Error"});
    }
  }
);

router.post(
  "/any",
  async (req, res) => {
    try {
      let document = req.body;
      let docInserted = await addAny(document);
      res.status(200).json(docInserted);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.put(
  "/addkeyword/:id",
  async (req, res)=>{
    try{
      const {id} = req.params;
      const {keyword} = req.body;
      let result = await addKeyword(id, keyword);
      res.status(200).json(result);
    }catch(ex){
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.put(
  "/addkeywords/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const { keywords } = req.body;
      let result = await addKeywords(id, keywords);
      res.status(200).json(result);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);


router.delete(
  "/del/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      let result = await deleteById(id);
      res.status(200).json(result);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);


module.exports = router;
