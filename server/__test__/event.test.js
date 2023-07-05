const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const setupMockDB = require("./setup/setup-mock-db");

let eventID
let token
let userID

describe("Community Events Endpoints", () => {

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
          userID = response.body.user_id
    })

    afterAll(async () => {
        await db.end() // Close the database connection
    })
    //crud tests

    //read all
    it("Should get all community events", async() => {
        const resp = await request(app)
        .get("/events")
        .expect(200)
        
        expect(Array.isArray(resp.body)).toBe(true)
        expect(resp.body.length).toBeGreaterThan(0)
    })

    //create one
    it("Should create a new event", async() => {
        const event = {
            creator_id: userID,
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

    // //read one
    // it("Should get an event by id", async() => {
    //     const resp = await request(app)
    //     .get(`/events/${eventID}/find`)
    // })
})

// describe("Community Events Endpoints", () => {
//   afterAll(async () => {
//     await db.end(); // Close the database connection
//   });
//   //Tests for our CRUD API
//   let classID;

//   //READ ALL
//   it("Should get all community events", async () => {
//     const response = await request(app).get("/events").expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   //CREATE ONE
//   it("Should create a new class", async () => {
//     const newCountry = {
//       name: "Test",
//       capital: "Test City",
//       population: 50000,
//       languages: "English",
//       fun_fact: "Testing is Fun",
//       map_image_url: "www.test.com",
//     };

//     const response = await request(app)
//       .post("/class")
//       .send(newCountry)
//       .expect(201);

//     const { class_id } = response.body;
//     classID = class_id;

//     expect(response.body).toMatchObject(newCountry);
//   });

//   //READ ONE
//   it("Should get the class that has been created", async () => {
//     const response = await request(app)
//       .get(`/class/${classID}`)
//       .expect(200);

//     const { capital } = response.body;
//     expect(capital).toBe("Test City");
//   });

//   //UPDATE ONE
//   it("Should update a class", async () => {
//     const updatedCountry = {
//       name: " U Test",
//       capital: "U Test City",
//       population: 60000,
//       languages: "English",
//       fun_fact: "Testing is Fun",
//       map_image_url: "www.test.com",
//     };

//     const response = await request(app)
//       .put(`/class/${classID}`)
//       .send(updatedCountry)
//       .expect(200);

//     expect(response.body).toMatchObject(updatedCountry);
//   });

//   //DELETE ONE
//   it("Should delete a class", async () => {
//     await request(app).delete(`/class/${classID}`).expect(204);
//     await request(app).get(`/class/${classID}`).expect(404);
//   });
// });
