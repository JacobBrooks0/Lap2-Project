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
      res.status(204).json({ message: response });
    } catch (error) {
      console.log(error);
      res.status(403).json({ Error: error.message });
    }
  }
}

<<<<<<< HEAD
async function getUserSkills(req, res) {
  try {
    const userId = req.params.userId;
    const skills = await User.getSkills(userId);
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

async function getUserClasses(req, res) {
  try {
    const userId = req.params.userId;
    const classes = await User.getClasses(userId);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

async function getUserEvents(req, res) {
  try {
    const userId = req.params.userId;
    const events = await User.getEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
  getUserSkills,
  getUserClasses,
  getUserEvents
};
=======
module.exports = UserController;
>>>>>>> cd650894a7f163208eb145e8ce022d98549de56f
