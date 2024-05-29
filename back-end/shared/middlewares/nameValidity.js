const User = require("../../models/User");

const checkUsernameUniqueness = async (req, res, next) => {
  try {
    const { firstName } = req.body;

    const existingUser = await User.findOne({ firstName });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkUsernameUniqueness;
