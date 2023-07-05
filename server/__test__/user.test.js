const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const setupMockDB = require("./mock/database/setup");

describe("User Endpoints", () => {
  beforeAll(async () => {
    await setupMockDB(); //Set the database to it's default state before starting test
  });
  afterAll(async () => {
    await db.end(); // Close the database connection
  });

  let token;
  const registerDetails = {
    username: "user",
    password: "password",
  };

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

  it("Should return error if user gives an incorrect username", async () => {
    await request(app)
      .post("/users/login")
      .send({
        username: "user1",
        password: "password",
      })
      .expect(403);
  });

  it("Should return error if user gives an incorrect password", async () => {
    await request(app)
      .post("/users/login")
      .send({
        username: "user",
        password: "pass",
      })
      .expect(403);
  });

  it("Should return an error message if the user tries to get their profile details without a valid token or one at all", async () => {
    const response1 = await request(app)
      .get("/users/details")
      .set({ authorization: "asdf" })
      .expect(403);

    let { Error } = response1.body;
    expect(Error).toBeDefined();

    const response2 = await request(app).get("/users/details").expect(403);

    ({ Error } = response2.body);
    expect(Error).toBeDefined();
  });

  it("Should get profile details after being created", async () => {
    const response = await request(app)
      .get("/users/details")
      .set({ authorization: token })
      .expect(200);

    const userObj = response.body;
    expect(userObj).toHaveProperty("username", "user");
    expect(userObj).toHaveProperty("name", null);
  });

  const profileDetails = {
    name: "My Name",
    profile_summary: "This is who I am",
  };
  it("Should update profile details", async () => {
    
    const response = await request(app)
      .patch("/users/update")
      .set({ authorization: token })
      .send(profileDetails)
      .expect(202);

    const userObj = response.body;
    expect(userObj).toHaveProperty("name", "My Name");
    expect(userObj).toHaveProperty("profile_summary");
  });

  it("Should logout", async () => {
    await request(app)
      .delete("/users/logout")
      .set({ authorization: token })
      .expect(202);
  });
});
