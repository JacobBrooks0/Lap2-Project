const Token = require("../models/token");

async function authenticator(req, res, next) {
  try {
    const userToken = req.headers["authorization"];
    if (userToken == null) {
      throw new Error("User not authenticated");
    } else {
      req.tokenObj = await Token.getOneByToken(userToken);
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "You're not authenticated" });
  }
}

module.exports = authenticator;
