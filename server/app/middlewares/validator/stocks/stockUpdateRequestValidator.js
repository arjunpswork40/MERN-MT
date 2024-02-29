const { body, validationResult } = require('express-validator');
const { makeJsonResponse } = require("../../../../utils/response");

const validMonths = [
    "january",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


exports.validateUpdateStockRequest = [
    body('month')
        .isLength({ min: 3 })
        .withMessage('Month must be at least 3 characters')
        .custom((value) => validMonths.map(month => month.toLowerCase()).includes(value.toLowerCase()))
        .withMessage(`Month must be one of: ${validMonths.join(', ')}`),
    body('quantity')
        .isNumeric()
        .withMessage('Quantity mustbe a number')
        .isLength({min: 1})
        .withMessage('Quantity cannot be empty'),

    body('price')
        .isNumeric()
        .withMessage('Price mustbe a number')
        .isLength({min: 1})
        .withMessage('Price cannot be empty'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            response = makeJsonResponse(`Validation error.`, {}, errors.array(), 400, false);
            return res.status(400).json(response);
        }
        next();
    }
];