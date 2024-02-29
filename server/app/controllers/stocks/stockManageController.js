const { makeJsonResponse } = require("../../../utils/response");
const Stock = require("../../models/Stocks");
module.exports = {
    
    stockUpdate: async (req, res, next) => {
        let httpStatusCode = 403;
        let response = {};

        let { month, quantity, price } = req.body
        month = month.toLowerCase();
        try {

            const result = await Stock.findOneAndUpdate(
                {month:month},
                {
                    $set : {
                        month: month,
                        quantity: quantity,
                        price: price
                    }
                },
                {
                    upsert: true,
                    returnDocument: 'after'
                }
            )
            
            httpStatusCode = 200;
            response = makeJsonResponse("Stock details updated successfully", {data:result}, {}, httpStatusCode);
            res.status(httpStatusCode).json(response);
        } catch (error) {
            response = makeJsonResponse("Internal error", {}, error, httpStatusCode, false);
            res.status(httpStatusCode).json(response);
        }
    },

    getStockDetails: async (req, res, next) => {
        let httpStatusCode = 403;
        let response = {};

        try {
            const result = await Stock.find().exec();
            httpStatusCode = 200;
            response = makeJsonResponse("Stock details", {data:result}, {}, httpStatusCode);
            res.status(httpStatusCode).json(response);
        } catch (error) {
            response = makeJsonResponse("Internal error", {}, error, httpStatusCode, false);
            res.status(httpStatusCode).json(response);
        }
    },
    
};
