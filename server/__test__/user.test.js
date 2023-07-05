const request = require("supertest");
const app = require("../app");
const setupMockDB = require("./setup/setup-mock-db");

describe("User Endpoints", () => {
  beforeAll(async () => {
    setupMockDB(); //Set the database to it's default state before starting test
  });
  afterAll(async () => {
    await db.end(); // Close the database connection
  });

  let token;
  const registerDetails = {
    username: "user",
    password: "password",
  };

  const db = require("../database/connect");

  it("Should register user to app", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(registerDetails)
      .expect(201);

    const userObj = response.body;
    expect(userObj).toHaveProperty("username", "user");
  });

  it("Should return a token after logging in", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(registerDetails)
      .expect(200);

    const userObj = response.body;
    expect(userObj).toHaveProperty("token");
    token = userObj.token;
  });

  it("Should update profile details", async () => {
    const profileDetails = {
      name: "My Name",
      profile_summary: "This is who I am",
    };
    const response = await request(app)
      .patch("/users/update", {})
      .set({ authorization: token })
      .send(profileDetails)
      .expect(202);

    const userObj = response.body;
    expect(userObj).toHaveProperty("name", "My Name");
    expect(userObj).toHaveProperty("profile_summary");
  });

  it("Should logout", async () => {
    await request(app)
      .delete("/users/logout", {})
      .set({ authorization: token })
      .expect(204);
  });
});
