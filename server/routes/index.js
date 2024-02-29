var express = require("express");
var router = express.Router();
const { testFunction } = require("../app/controllers");
const { validateRequest } = require("../requests/generateToken");


router.get("/test-connection", testFunction);
module.exports = router;
