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
        const response = await db.query('SELECT * FROM jobs where job_id = $1', [id]);
        if (response.rows.length === 0) {
            throw new Error('No Jobs found')
        }
        return response.rows;
    }

    static async createJob(data) {
        let response = await db.query('INSERT INTO job (job_id, user_id, job_subject, job_description, job_location, job_requirements) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',data);
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

// job_id INT GENERATED ALWAYS AS IDENTITY,
//     user_id INT NOT NULL, 
//     job_subject VARCHAR(50) UNIQUE NOT NULL,
//     job_description VARCHAR(500),
//     job_location VARCHAR(100) ,
//     job_requirements
