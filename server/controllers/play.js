const Play = require("../models/play");

class PlayController {
  static async getAllPlays(req, res) {
    try {
      const data = await Play.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ Error: error });
    }
  }
  static async getMyPlays(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const data = await Play.getAllById(user_id);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ Error: error });
    }
  }
  static async createPlay(req, res) {
    const user_id = req.tokenObj.user_id;
    const playInfo = Object.values(req.body);
    playInfo.unshift(user_id);
    try {
      const data = await Play.createPlay(playInfo);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  }

}

module.exports = PlayController;
