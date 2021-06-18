const express = require('express');
const router = express.Router();
const {
  getAll,
  addOne,
  addAny,
  getById,
  getBySales,
  getBySalesWithOperator,
  getBySalesRange
} = require('./snippets.model');

router.get(
  "/",
  async (req, res)=>{
    try{
      let rows = await getAll();
      res.status(200).json(rows);
    }catch(ex){
      res.status(500).json({"msg":"Error"});
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

router.post(
  "/new",
  async (req, res)=>{
    try{
      let {name, snippet} = req.body;
      let docInserted = await addOne(name, snippet, 'obetancourth');
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



module.exports = router;
