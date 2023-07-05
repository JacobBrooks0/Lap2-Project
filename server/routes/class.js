const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const ClassController = require("../controllers/class");

const classRouter = Router();

classRouter.get("/", ClassController.getAllClasses);
classRouter.get("/:id/students", ClassController.getUsersEnrolled);
classRouter.get("/:id/is-at-capacity", ClassController.getCapacityStatus);
classRouter.get("/:id/find", ClassController.getClassByClassId);

classRouter.use(authenticator);

classRouter.post("/", ClassController.createClass);
classRouter.patch("/:id", ClassController.updateClass);
classRouter.delete("/:id", ClassController.deleteClass);

classRouter.get("/enrolled", ClassController.getMyEnrolledClasses);
classRouter.get("/created", ClassController.getMyCreatedClasses);

classRouter.post("/:id/enroll", ClassController.enrollClass);
classRouter.delete("/:id/delist", ClassController.delistClass);

module.exports = classRouter;
