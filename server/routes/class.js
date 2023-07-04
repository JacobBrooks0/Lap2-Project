const { Router } = require("express");
const authenticator = require('../middleware/authenticator')
const ClassController = require("../controllers/class");

const classRouter = Router();

classRouter.get('/', ClassController.getAllClasses);
classRouter.get('/:id/students', ClassController.getUsersEnrolled);
classRouter.get('/:id/find', ClassController.getClassById);

classRouter.use(authenticator);

classRouter.post('/', ClassController.createClass);
classRouter.delete('/', ClassController.removeClass);

classRouter.get('/enrolled', ClassController.getMyEnrolledClasses);
classRouter.get('/created', ClassController.getMyCreatedClasses);

classRouter.post('/:id/enroll', ClassController.enrollClass);
classRouter.delete('/:id/delist', ClassController.delistClass);

module.exports = classRouter;
