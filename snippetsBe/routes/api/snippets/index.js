var express = require("express");
var router = express.Router();

router.get("/", (req, res)=>{
	res.status(200).json({"version":0.01});
}); //get /


module.exports = router;
