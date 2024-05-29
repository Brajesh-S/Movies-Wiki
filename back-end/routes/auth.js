const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../shared/middlewares/errorHandler");
const registerRequest = require("../models/requests/registerRequest");
const loginRequest = require("../models/requests/loginRequest");
const dotenv = require("dotenv");
const checkEmailUniqueness = require("../shared/middlewares/emailValidation");
const checkUsernameUniqueness = require("../shared/middlewares/nameValidity");
dotenv.config();

// Construct paths to RSA key files using __dirname
const privateKeyPath = path.join(__dirname, "private.pem");
const publicKeyPath = path.join(__dirname, "public.pem");
// Read RSA key files
const privateKey = fs.readFileSync(privateKeyPath);
const publicKey = fs.readFileSync(publicKeyPath);

// Register
router.post(
  "/register",
  checkUsernameUniqueness,
  checkEmailUniqueness,
  registerRequest,
  async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const sanitizedFirstName = firstName.trim(),
        sanitizedLastName = lastName.trim(),
        sanitizedEmail = email.trim(),
        sanitizedPassword = password.trim();

      const saltRounds = process.env.SALT_Rounds || 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(sanitizedPassword, salt);

      const newUser = new User({
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        email: sanitizedEmail,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const responseUser = {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      };

      res.status(201).json(responseUser);
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        // Duplicate key error
        return res
          .status(400)
          .json({
            error: true,
            message: "Email address is already registered.",
          });
      } else {
        // Other errors
        next(err);
      }
    }
  }
);
app.use(express.json());

// Login
router.post(
  "/login",
  loginRequest,

  async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        console.error(error);
        next(error);
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;

        next(error);
        return;
      }
      // Generate Token
      const payload = { id: user._id };
      const options = { algorithm: "RS256", expiresIn: "1d" };
      const accessToken = jwt.sign(payload, privateKey, options);

      // Sending Response with Access token
      const response = {
        _id: user._id,
        email: user.email,
        name: user.firstName,
        isAdmin: user.isAdmin,
        accessToken,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);
router.use(errorHandler);
module.exports = router;
