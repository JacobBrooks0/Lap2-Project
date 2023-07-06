const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const setupMockDB = require("./mock/database/setup")

test('Should give message when running api', async () => {
    const resp = await request(app).get('/')
    .expect(200)
})

describe("Community Events Endpoints", () => {
    let token
    let eventID

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
        await request(app).get('/events').expect(404);
        await request(app).get('/events/1/find').expect(404);

        await request(app).post('/events')
        .set({authorization: token}).send({}).expect(500);
        await request(app).delete('/events/1')
        .set({authorization: token}).expect(500);

        await request(app).get('/events/created')
        .set({authorization: token}).expect(404);
        await request(app).get('/events/bookmarked')
        .set({authorization: token}).expect(404);

        await request(app).delete('/events/1/bookmark')
        .set({authorization: token}).expect(500);
        await request(app).post('/events/1/bookmark')
        .set({authorization: token}).expect(500);
    })

    //crud tests

    //create an event
    it("Should create a new event", async() => {
        const event = {
            name: "Book club",
            main_image_url: "https://tse4.mm.bing.net/th?id=OIP.jHMwSwX0ZK2kiSGh0zdv6wHaE7&pid=Api",
            info:"New book club every week",
            start_date: 1688230800,
            end_date: 1688230800
        }

        const resp = await request(app)
        .post("/events")
        .set({ authorization: token })
        .send(event)
        .expect(201)

        const { event_id } = resp.body
        eventID = event_id

        expect(resp.body).toHaveProperty("name",event.name)
    })

    //read all events
    it("Should get all community events", async() => {
        const resp = await request(app)
        .get("/events")
        .expect(200)
        
        expect(Array.isArray(resp.body)).toBe(true)
        expect(resp.body.length).toBeGreaterThan(0)
    })

    //read one event
    it("Should get the event created by id", async() => {
        const resp = await request(app)
        .get(`/events/${eventID}/find`)
        .expect(200)

        expect(resp.body).toHaveProperty('event_id',eventID)
    })

    //create a bookmark
    it("Should bookmark the event created", async() => {
        const resp = await request(app)
        .post(`/events/${eventID}/bookmark`)
        .set({authorization: token})
        .expect(201)

        expect(resp.body).toHaveProperty('event_id',eventID)
    })

    it("Should send error when bookmarking again", async() => {
        const resp = await request(app)
        .post(`/events/${eventID}/bookmark`)
        .set({authorization: token})
        .expect(500)
    })

    //read all bookmarks
    it('Should show all bookmarked events by user', async() => {
        const resp = await request(app)
        .get('/events/bookmarked')
        .set({authorization: token})
        .expect(200)

        expect(Array.isArray(resp.body)).toBe(true)
        expect(resp.body.length).toBeGreaterThan(0)
    })

    //delete bookmark
    it('Should delete bookmark made', async() => {
        const resp = await request(app)
        .delete(`/events/${eventID}/bookmark`)
        .set({authorization: token})
        .expect(204)
    })

    //read created events
    it('Should show event created', async() => {
        const resp = await request(app)
        .get('/events/created')
        .set({authorization:token})
        .expect(200)

        expect(Array.isArray(resp.body)).toBe(true)
        expect(resp.body.length).toBeGreaterThan(0)
    })

    //delete event
    it('Should delete the event created', async() => {
        const resp = await request(app)
        .delete(`/events/${eventID}`)
        .set({authorization: token})
        .expect(204)
    })

    afterAll(async () => {
        await db.end() // Close the database connection
    })
})

