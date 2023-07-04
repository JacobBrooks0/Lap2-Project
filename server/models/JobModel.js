const db = require('../database/connect');

class Job {
    constructor(job_subject,  job_description, job_location, job_requirements) {
        this.job_subject = job_subject;
        this. job_description =  job_description;
        this.job_location = job_location;
        this.job_requirements = job_requirements;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM jobs');
        if (response.rows.length === 0) {
            throw new Error('No Jobs found')
        }
        return response.rows;
    }

    static async getAllById(id) {
        const response = await db.query('SELECT * FROM jobs where user_id = $1', [id]);
        if (response.rows.length === 0) {
            throw new Error('No Jobs found')
        }
        return response.rows;
    }

    // static async getOneById(id) {
    //     const response = await db.query('SELECT * FROM jobs WHERE job_id = $1 AND user_id = $2;',[id]);
    //     // console.log(`job id ${job_id}`)
    //     // console.log(`user_id ${user_id}`)
    //     console.log(response)
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to locate Job.")
    //     }
    //     return new Job(response.rows[0]);
    // }

    static async createJob(data) {
        let response = await db.query('INSERT INTO jobs (user_id, job_subject, job_description, job_location, job_requirements) VALUES ($1, $2, $3, $4, $5) RETURNING *;',data);
        return response.rows[0];
    }


    
    static async deleteJob(id) {
        const response = await db.query('DELETE FROM jobs WHERE job_id = $1 RETURNING *;', [id]);
        if (response.rows.length != 0) {
            throw new Error("Unable to delete job.")
        }
        return new Job(response.rows[0]);
    }
}

module.exports = Job;
