const express = require('express');
const router = express.Router();
const { getAll, addOne } = require('./snippets.model');

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



module.exports = router;
