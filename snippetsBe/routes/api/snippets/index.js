var express = require("express");
var router = express.Router();

const {
  getAll,
  getAllAsync,
  getById,
  getByIdAsync,
  addNew,
  addNewAsync,
  update,
  updateAsync,
  deleteRow,
  deleteAsync
} = require("./snippets.model");

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

router.get(
  "/byid/:id",
  (req, res)=>{
    const { id } = req.params;
    getById(id, (err, rows)=>{
      if(err){
        res.status(500).json({msg:"error"});
      } else {
        res.status(200).json(rows);
      }
    });
  }
);

router.get(
  "/byidasync/:id",
  async (req, res) => {
    const { id } = req.params;
    try {
      const rows = await getByIdAsync(id);
      res.status(200).json(rows);
    } catch(ex){
      res.status(500).json({ msg: "error" });
    }
  }
);

router.post(
  "/new",
  (req, res)=>{
    const { snippetName, snippet, stated } = req.body;
    //validaciones
    addNew(snippetName, snippet, stated, (err, result)=>{
        if(err) {
          res.status(500).json({"msg":"error"});
        } else {
          res.status(200).json(result);
        }
    });
  }
);

router.post(
  "/newasync",
  async (req, res) => {
    const { snippetName, snippet, stated } = req.body;
    //validaciones
    try{
      const result = await addNewAsync({ snippetName, snippet, stated})
      res.status(200).json(result);
    }  catch (ex) {
      console.log(ex);
      res.status(500).json({ msg: "error" });
    }
  }
);

router.put(
  "/update/:id",
  (req, res) => {
    const {id} = req.params;
    const { snippetName, snippet, stated } = req.body;
    //validaciones
    update(snippetName, snippet, stated, id, (err, result) => {
      if (err) {
        res.status(500).json({ "msg": "error" });
      } else {
        res.status(200).json(result);
      }
    });
  }
);

router.put(
  "/updateasync/:id",
  async (req, res) => {
    const { id } = req.params;
    const { snippetName, snippet, stated } = req.body;
    //validaciones
    try {
      const result = await updateAsync({ snippetName, snippet, stated, id })
      res.status("200").json(result);
    } catch (ex) {
      res.status(500).json({ msg: "error" });
    }
  }
);

router.delete(
  "/delete/:id",
  (req, res) => {
    const { id } = req.params;
    //validaciones
    deleteRow(id, (err, result) => {
      if (err) {
        res.status(500).json({ "msg": "error" });
      } else {
        res.status(200).json(result);
      }
    });
  }
);

router.delete(
  "/deleteasync/:id",
  async (req, res) => {
    const { id } = req.params;
    //validaciones
    try {
      const result = await deleteAsync( id );
      res.status("200").json(result);
    } catch (ex) {
      res.status(500).json({ msg: "error" });
    }
  }
);


module.exports = router;
