const { Router } = require("express");
const authenticator = require('../middleware/authenticator')
const JobController = require("../controllers/JobController");

const jobRouter = Router();

jobRouter.get('/', JobController.getAllJobs);
jobRouter.get('/my', authenticator, JobController.getMyJobs);
jobRouter.post('/', authenticator, JobController.createJob);
// jobRouter.patch('/my', authenticator, JobController.update);
jobRouter.delete('/my', authenticator,JobController.deleteJob);

module.exports = jobRouter;
