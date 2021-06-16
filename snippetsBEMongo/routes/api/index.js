const express = require('express');
const router = express.Router();

const snippetsRoutes = require('./snippets');

router.use("/snippets", snippetsRoutes);


module.exports = router;
