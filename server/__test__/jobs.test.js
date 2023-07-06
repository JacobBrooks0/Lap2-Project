const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const setupMockDB = require("./mock/database/setup")


describe("Jobs Endpoints", () => {
    let token
    let jobID

    beforeAll(async () => {
        setupMockDB()

        const registerDetails = {
            username: "user",
            password: "password",
          }

        await request(app)
            .post("/users/register")
            .send(registerDetails)

        const response = await request(app)
            .post("/users/login")
            .send(registerDetails)
        token = response.body.token
    })

    //testing error handling
    it("Should give correct status codes for errors", async () => {
        await request(app).get('/jobs').expect(404);
        await request(app).get('/jobs/my')
        .set({authorization: token}).expect(404);

        await request(app).post('/jobs')
        .set({authorization: token}).send({}).expect(500);

        await request(app).delete('/jobs/my/1')
        .set({authorization:token}).expect(404);
    })

    //crud tests

    //create an job
    it("Should create a new job", async() => {
        const job = {
            job_subject: "Librarian",
            job_description: "Need a librarian",
            job_location:"Florin",
            job_requirements: "Shelving" 
        }

        const resp = await request(app)
        .post("/jobs")
        .set({ authorization: token })
        .send(job)
        .expect(201)

        const { job_id } = resp.body
        jobID = job_id

        expect(resp.body).toHaveProperty("job_subject",job.job_subject)
    })

    //read all job
    it("Should get all jobs", async() => {
        const resp = await request(app)
        .get("/jobs")
        .expect(200)
        
        expect(Array.isArray(resp.body)).toBe(true)
        expect(resp.body.length).toBeGreaterThan(0)
    })

    //read job by id
    it('Should get job created by id', async() => {
        const resp = await request(app)
        .get(`/jobs/${jobID}`)
        .set({authorization:token})
        .expect(200)

        expect(resp.body).toHaveProperty('job_id',jobID)
    })

    //read created job
    it("Should get the job created by user", async() => {
        const resp = await request(app)
        .get(`/jobs/my`)
        .set({authorization: token})
        .expect(200)

        expect(Array.isArray(resp.body)).toBe(true)
        expect(resp.body.length).toBeGreaterThan(0)
    })

    //delete job
    it('Should delete the job created', async() => {
        const resp = await request(app)
        .delete(`/jobs/my/${jobID}`)
        .set({authorization: token})
        .expect(204)
    })

    afterAll(async () => {
        await db.end() // Close the database connection
    })
})

