const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKeyPath = path.join(__dirname, "public.pem");
const publicKey = fs.readFileSync(publicKeyPath);

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(accessToken, publicKey, {
        algorithms: ["RS256"],
      });
      const userId = decoded.id;
      req.userId = userId;
    } catch (error) {
      console.error("Token verification failed:", error.message);
      const errorResponse = {
        error: true,
        message: "Invalid token",
      };
      res.status(401).json(errorResponse);

      return;
    }
  } else {
    return res.status(401).json("You are not authenticated");
  }
  next();
}
module.exports = verify;
