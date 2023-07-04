const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");

describe("Class Router", () => {
  afterAll(async () => {
    await db.end(); // Close the database connection
  });
  //Tests for our CRUD API
  let classID;

  //READ ALL
  it("Should get all classes", async () => {
    const response = await request(app).get("/classes").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

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
});
