const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const setupMockDB = require("./setup/setup-mock-db");

describe("Class Endpoints", () => {
  let token;
  let classId;

  beforeAll(async () => {
    setupMockDB(); //Set the database to it's default state before starting test
    //Create an account and login, getting the token at the end of it
    const registerDetails = {
      username: "user",
      password: "password",
    };
    await request(app).post("/users/register").send(registerDetails);
    const response = await request(app)
      .post("/users/login")
      .send(registerDetails);
    token = response.body.token;
  });

  afterAll(async () => {
    await db.end(); // Close the database connection
  });

  //READ ALL
  it("Should get all classes", async () => {
    const response = await request(app).get("/classes").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //CREATE ONE
  it("Should create a new class", async () => {
    const newClass = {
      name: "Learn Carpentry",
      main_image_url:
        "https://www.self-build.co.uk/wp-content/uploads/2012/11/carpentry-build-basics-2000x1442.jpg",
      info: "Learn how to fix wooden appliances around the house",
      start_date: 1688230800,
      end_date: 1688330800,
      capacity: 4,
    };

    const response = await request(app)
      .post("/classes")
      .set({ authorization: token })
      .send(newClass)
      .expect(201);

    const { class_id } = response.body;
    classId = class_id;

    expect(response.body).toHaveProperty("class_id", classId);
  });

  //READ ONE
  it("Should get the class that has been created", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/find`)
      .expect(200);

    const { name } = response.body;
    expect(name).toBe("Learn Carpentry");
  });

  //UPDATE ONE
  it("Should update a class", async () => {
    const updatedClass = {
      name: "Test Carpentry",
      info: "Test",
      start_date: 1688230800,
      end_date: 1688330800,
      capacity: 4,
    };

    const response = await request(app)
      .patch(`/classes/${classId}`)
      .set({ authorization: token })
      .send(updatedClass)
      .expect(202);

    const { main_image_url, name } = response.body;
    expect(name).toBe("Test Carpentry");
    expect(main_image_url).toBe(null);
  });

  //   //DELETE ONE
  //   it("Should delete a class", async () => {
  //     await request(app).delete(`/class/${classID}`).expect(204);
  //     await request(app).get(`/class/${classID}`).expect(404);
  //   });
});
