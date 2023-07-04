const Job = require("../models/JobModel");

class JobController {
  static async getAllJobs(req, res) {
    try {
      const data = await Job.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ Error: error });
    }
  }
  static async getMyJobs(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const data = await Job.getAllById(user_id);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ Error: error });
    }
  }
  static async createJob(req, res) {
    const user_id = req.tokenObj.user_id;
    const JobInfo = Object.values(req.body);
    JobInfo.unshift(user_id);
    try {
      const data = await Job.createJob(jobInfo);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  }
  static async deleteJob(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
        
        const result = await Job.deleteJob(user_id);
        
        res.status(204).json(result);
    } catch (err) {
        console.log(err)
        res.status(404).json({"error": err.message})
    }
    }
}


module.exports = JobController;
