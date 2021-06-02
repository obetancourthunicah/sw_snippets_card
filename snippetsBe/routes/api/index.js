var express = require("express");
var router = express.Router();

var snippets_routes = require("./snippets/index");

router.use("/snippets", snippets_routes);


module.exports = router;
