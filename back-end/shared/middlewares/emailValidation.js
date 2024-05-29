const User = require("../../models/User");

const checkEmailUniqueness = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email address is already in use" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkEmailUniqueness;
