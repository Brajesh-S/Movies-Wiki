const { body } = require('express-validator');
const validateInput = require('../../../shared/middlewares/validateInput');


const loginRequest = [
    body('email').isEmail().trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape(),
    validateInput,
]

module.exports = loginRequest;