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
    console.log(error);
    res.status(403).json({ Error: "User not authenticated" });
  }
}

module.exports = authenticator;
