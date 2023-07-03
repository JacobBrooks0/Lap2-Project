require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/token");

async function register(req, res) {
  try {
    const data = req.body;
    const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

    const salt = await bcrypt.genSalt(rounds);
    data["password"] = await bcrypt.hash(data["password"], salt);

    const result = await User.create(data);

    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByUsername(data.username);
    const authenticated = await bcrypt.compare(data.password, user["password"]);
    if (!authenticated) {
      throw new Error("Wrong username or password");
    } else {
      const token = await Token.create(user["id"]);
      res.status(200).json({ authenticated: true, token: token.token });
    }
  } catch (error) {
    res.status(403).json({ Error: error.message });
  }
}

async function logout(req, res) {
  const tokenObj = req.tokenObj;
  try {
    const response = await tokenObj.removeToken();
    res.status(202).json({ message: response });
  } catch (error) {
    res.status(403).json({ Error: error.message });
  }
}

module.exports = {
  register,
  login,
  logout
};
