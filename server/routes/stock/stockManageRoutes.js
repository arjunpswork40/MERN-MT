var express = require("express");
var router = express.Router();
const { stockUpdate,getStockDetails } = require("../../app/controllers/stocks/stockManageController")
const { validateUpdateStockRequest } = require("../../app/middlewares/validator/stocks/stockUpdateRequestValidator")

router.get("/get-stock-details",getStockDetails)

router.put("/stock-update",validateUpdateStockRequest,stockUpdate)

module.exports = router;
