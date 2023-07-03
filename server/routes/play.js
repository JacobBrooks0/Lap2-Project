const { Router } = require("express");
const authenticator = require('../middleware/authenticator')
const PlayController = require("../controllers/play");

const playRouter = Router();

playRouter.get('/', PlayController.getAllPlays);
playRouter.get('/my', authenticator, PlayController.getMyPlays);
playRouter.post('/', authenticator, PlayController.createPlay);

module.exports = playRouter;
