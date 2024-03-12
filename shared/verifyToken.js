const path = require('path');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const publicKeyPath = path.join(__dirname, 'public.pem');
const publicKey = fs.readFileSync(publicKeyPath);
const responseHelper = require('../shared/helpers/responseHelpers');
const errorHandler = require('../shared/middlewares/errorHandler');

function verify(req, res, next)  {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] });
            const userId = decoded.id
            req.userId = userId
            console.log("success",decoded);
        } catch (error) {
            console.error('Token verification failed:', error.message);
            // Handle token verification failure, e.g., return an error response
            const response = responseHelper.formatResponse(null, true, 'Invalid token');
            res.status(401).json(response);
            return;
        }
      } else {
        return res.status(401).json('You are not authenticated');
    }
    next();
}
module.exports = verify;
