const { Router } = require("express");
const authenticator = require('../middleware/authenticator')
const JobController = require("../controllers/JobController");

const jobRouter = Router();

jobRouter.get('/', JobController.getAllJobs);
jobRouter.get('/my', authenticator, JobController.getMyJobs);
// jobRouter.get('/my/:id', authenticator, JobController.getOneById);
jobRouter.post('/', authenticator, JobController.createJob);
// jobRouter.put('/my', authenticator, JobController.update);
jobRouter.delete('/my/:id', authenticator,JobController.deleteJob);

module.exports = jobRouter;
