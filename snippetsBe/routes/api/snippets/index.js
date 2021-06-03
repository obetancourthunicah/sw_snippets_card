var express = require("express");
var router = express.Router();

const { getAll } = require("./snippets.model");

router.get("/", (req, res)=>{
	res.status(200).json({"version":0.01});
}); //get /

router.get("/all", (req, res)=>{
  getAll(
    (err, rows)=>{
      if(err){
        res.status(500).json({"msg":"Error al Procesar"});
      }else{
        res.status(200).json(rows);
      }
    }
  );
});


module.exports = router;
