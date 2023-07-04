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
//   static async getOneById(req, res) {
        
//     const user_id = req.tokenObj.user_id;
//     const job_id = req.params.id;
   
//     try {
//         const data = await Job.getAllById(user_id);
//         console.log(data)
//         const job = await data.getOneById(job_id)
//         res.status(200).json(job);
//     } catch (err) {
//         res.status(404).json({"error": err.message})
//     }
// }
  static async createJob(req, res) {
    const user_id = req.tokenObj.user_id;
    const JobInfo = Object.values(req.body);
    JobInfo.unshift(user_id);
    try {
      const data = await Job.createJob(JobInfo);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  }
  static async deleteJob(req, res) {
    const id = req.tokenObj.job_id;
    console.log(id)
    try {
        const job = await Job.getOneById(id)
        console.log(job)
        const result = await job.deleteJob();
        
        res.status(204).json(result);
    } catch (err) {
        console.log(err)
        res.status(404).json({"error": err.message})
    }
    }
}


module.exports = JobController;
