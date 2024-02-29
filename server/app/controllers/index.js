const { validateRequest } = require("../../requests/generateToken");
const { makeJsonResponse } = require("../../utils/response");
const User = require("../models/User");
module.exports = {
    
    testFunction: async (req, res, next) => {
        let httpStatusCode = 403;
        let response = {};
        try {
            httpStatusCode = 200;
            
            response = makeJsonResponse("Success", {data:'success'}, {}, httpStatusCode);
            res.status(httpStatusCode).json(response);
        } catch (error) {
            console.log("Getting user info failed", error);
            response = makeJsonResponse("Cant get user", {}, error, httpStatusCode, false);
            res.status(httpStatusCode).json(response);
        }
    },
};
