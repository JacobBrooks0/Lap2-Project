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

  //GET
  it("Should get all classes", async () => {
    const response = await request(app).get("/classes").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //POST
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
  
  //GET
  it("Should make class not full before this user has enrolled", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/is-at-capacity`)
      .expect(200);
    const { classIsFull } = response.body;
    expect(classIsFull).toBe(false);
  });

  //GET
  it("Should get the class that has been created", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/find`)
      .expect(200);

    const { name } = response.body;
    expect(name).toBe("Learn Carpentry");
  });

  //GET
  it("Should get users created classes when requested", async () => {
    const response = await request(app)
      .get(`/classes/created`)
      .set({ authorization: token })
      .expect(200);
    
    const createdArr = response.body;

    expect(Array.isArray(createdArr)).toBe(true);
    expect(createdArr.length).toBe(1);

    const { name, capacity } = createdArr[0];
    expect(name).toBe("Learn Carpentry");
    expect(capacity).toBe(4);
  });

  //PATCH
  it("Should update a class", async () => {
    const updatedClass = {
      name: "Test Carpentry",
      info: "Test",
      start_date: 1688230800,
      end_date: 1688330800,
      capacity: 1,
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

  //POST
  it("Should enroll a student/user to a class", async () => {
    const response = await request(app)
      .post(`/classes/${classId}/enroll`)
      .set({ authorization: token })
      .expect(201);

    expect(response.body).toHaveProperty("class_student_id");
  });

  //GET
  it("Should get all student/users enrolled to class when requested", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/students`)
      .expect(200);
    
    const studentArr = response.body;
    expect(Array.isArray(studentArr)).toBe(true);
    expect(studentArr.length).toBe(1);

    const { username } = studentArr[0];
    expect(username).toBe("user");
  });

  //GET
  it("Should make class full after this user has enrolled", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/is-at-capacity`)
      .expect(200);
    const { classIsFull } = response.body;
    expect(classIsFull).toBe(true);
  });

  //GET
  it("Should get users enrolled classes when requested", async () => {
    const response = await request(app)
      .get(`/classes/enrolled`)
      .set({ authorization: token })
      .expect(200);
    
    const enrolledArr = response.body;

    expect(Array.isArray(enrolledArr)).toBe(true);
    expect(enrolledArr.length).toBe(1);

    const { name, info } = enrolledArr[0];
    expect(name).toBe("Test Carpentry");
    expect(info).toBe("Test");
  });

  //DELETE
  it("Should delist a student/user from a class", async () => {
    await request(app)
      .delete(`/classes/${classId}/delist`)
      .set({ authorization: token })
      .expect(204);
  });

  //DELETE
  it("Should delete a class", async () => {
    await request(app)
      .delete(`/classes/${classId}`)
      .set({ authorization: token })
      .expect(204);
    await request(app)
      .get(`/class/${classId}`)
      .set({ authorization: token })
      .expect(404);
  });
});
