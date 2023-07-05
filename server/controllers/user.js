require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/token");

class UserController {
  static async register(req, res) {
    try {
      const data = req.body;
      const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

      const salt = await bcrypt.genSalt(rounds);
      data["password"] = await bcrypt.hash(data["password"], salt);

      const result = await User.createUser(data);

      res.status(201).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }

  static async login(req, res) {
    const data = req.body;
    try {
      const user = await User.getOneByUsername(data.username);
      const authenticated = await bcrypt.compare(
        data.password,
        user["password"]
      );
      if (!authenticated) {
        throw new Error("Wrong username or password");
      } else {
        const token = await Token.create(user["id"]);
        res.status(200).json({ authenticated: true, token: token.token });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ Error: error.message });
    }
  }

  static async getProfileDetails(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const result = await User.getOneById(user_id);
      delete result.password;
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async updateProfileDetails(req, res) {
    const user_id = req.tokenObj.user_id;
    const data = req.body;
    try {
      const user = await User.getOneById(user_id);
      const result = await user.updateProfileDetails(data);
      res.status(202).send(result);
    } catch (error) {
      console.log(error);
      res.status(304).json({ Error: error.message });
    }
  }
  
  static async logout(req, res) {
    const tokenObj = req.tokenObj;
    try {
      const response = await tokenObj.deleteToken();
      res.status(202).json({ message: response });
    } catch (error) {
      console.log(error);
      res.status(403).json({ Error: error.message });
    }
  }
}

module.exports = UserController;
