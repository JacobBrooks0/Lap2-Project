const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const CommunityEventController = require("../controllers/event");

const eventsRouter = Router();

eventsRouter.get("/", CommunityEventController.getAllCommunityEvents);
eventsRouter.get("/:id/find", CommunityEventController.getCommunityEventById);

eventsRouter.use(authenticator);

eventsRouter.post("/", CommunityEventController.createCommunityEvent);
eventsRouter.delete("/:id", CommunityEventController.deleteCommunityEvent);

eventsRouter.get("/bookmarked", CommunityEventController.getMyBookmarkedCommunityEvents);
eventsRouter.get("/created", CommunityEventController.getMyCreatedCommunityEvents);

eventsRouter.post("/:id/bookmark", CommunityEventController.bookmarkCommunityEvent);

eventsRouter.delete("/:id/bookmark", CommunityEventController.removeCommunityEventBookmark);

module.exports = eventsRouter;
