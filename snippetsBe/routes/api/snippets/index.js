var express = require("express");
var router = express.Router();

const { getAll, getAllAsync } = require("./snippets.model");

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

router.get("/allasync", async (req, res) => {
  try{
    const rows =  await getAllAsync();
    res.status(200).json(rows);
  }catch(ex){
    console.log(ex);
    res.status(500).json({msg:"error"});
  }
});


module.exports = router;
