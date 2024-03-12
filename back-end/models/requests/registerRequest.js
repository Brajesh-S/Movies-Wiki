const { body } = require('express-validator');
const validateInput = require('../../../shared/middlewares/validateInput');


const registerRequest = [
    body('firstName').isAlphanumeric().isLength({ min: 3, max: 20 }).trim().escape(),
    body('lastName').isAlphanumeric().isLength({ min: 1, max: 20 }).trim().escape(),
    body('email').isEmail().trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape(),
    validateInput,
]
module.exports = registerRequest;