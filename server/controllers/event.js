const CommunityEvent = require("../models/event");

class CommunityEventController {
  static async getAllCommunityEvents(req, res) {
    try {
      const data = await CommunityEvent.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async getCommunityEventById(req, res) {
    const event_id = req.params.id;
    try {
      const data = await CommunityEvent.getOneById(event_id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async getMyBookmarkedCommunityEvents(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const data = await CommunityEvent.getBookmarkedByUserId(user_id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async getMyCreatedCommunityEvents(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const data = await CommunityEvent.getCreatedByUserId(user_id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async createCommunityEvent(req, res) {
    const creator_id = req.tokenObj.user_id;
    const eventInfo = { ...req.body, creator_id };
    try {
      const data = await CommunityEvent.createCommunityEvent(eventInfo);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    }
  }

  static async deleteCommunityEvent(req, res) {
    const event_id = req.params.id;
    const creator_id = req.tokenObj.user_id;
    try {
      const communityEvent = await CommunityEvent.getOneById(event_id);
      console.log(communityEvent);
      const data = await communityEvent.deleteCommunityEvent(creator_id);
      res.status(204).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    }
  }

  static async bookmarkCommunityEvent(req, res) {
    const event_id = req.params.id;
    const user_id = req.tokenObj.user_id;
    try {
      const communityEvent = await CommunityEvent.getOneById(event_id);
      const data = await communityEvent.bookmarkEvent(user_id);
      res.status(201).json(data);
    } catch (error) {
        switch (+error.code) {
          case 23505:
            res.status(500).json({
              Error: "You've already bookmarked this community event",
            });
            break;
          default:
            res.status(500).json({ Error: error.message });
            break;
        }
    }
  }

  static async removeCommunityEventBookmark(req, res) {
    const event_id = req.params.id;
    const user_id = req.tokenObj.user_id;
    try {
      const communityEvent = await CommunityEvent.getOneById(event_id);
      const data = await communityEvent.removeEventBookmark(user_id);
      res.status(204).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    }
  }
}

module.exports = CommunityEventController;
