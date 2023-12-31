const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const setupMockDB = require("./mock/database/setup");

describe("Class Endpoints", () => {
  let token;
  let classId;

  beforeAll(async () => {
    //Set the database to it's default state before starting test
    await setupMockDB(); 

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
    // Close the database connection
    await db.end(); 
  });

  //GET
  it("Should give correct status codes when there are no classes available", async () => {
    await request(app).get("/classes").expect(404);
    await request(app).get("/classes/1/students").expect(404);
    await request(app).get("/classes/1/find").expect(404);
    await request(app).get("/classes/1/is-at-capacity").expect(404);
    await request(app)
      .get("/classes/enrolled")
      .set({ authorization: token })
      .expect(404);
    await request(app)
      .get("/classes/created")
      .set({ authorization: token })
      .expect(404);
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
      capacity: 0,
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

  //POST
  it("Should return an error message if conditions for creating a new class haven't been met", async () => {
    const newClass = {
      info: "Learn how to fix wooden appliances around the house",
      start_date: 1688230800,
      end_date: 1688330800,
      capacity: 4,
    };

    await request(app)
      .post("/classes")
      .set({ authorization: token })
      .send(newClass)
      .expect(500);
  });

  //GET
  it("Should get all classes", async () => {
    const response = await request(app).get("/classes").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
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
    expect(capacity).toBe(0);
  });

  //POST
  it("Should give an error if user tries to enrol to a full class already", async () => {
    const response = await request(app)
      .post(`/classes/${classId}/enroll`)
      .set({ authorization: token })
      .expect(500);

    let { Error } = response.body;
    expect(Error).toMatch(/Sorry, the class is full/);
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

  //GET
  it("Should make class not full before this user has enrolled", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/is-at-capacity`)
      .expect(200);
    const { classIsFull } = response.body;
    expect(classIsFull).toBe(false);
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
  it("Should make class full after this user has enrolled", async () => {
    const response = await request(app)
      .get(`/classes/${classId}/is-at-capacity`)
      .expect(200);
    const { classIsFull } = response.body;
    expect(classIsFull).toBe(true);
  });

  //POST
  it("Should give an error already enrolled user tries to enroll to a class again", async () => {
    await request(app)
      .patch(`/classes/${classId}`)
      .set({ authorization: token })
      .send({
        name: "Test Carpentry",
        info: "Test",
        start_date: 1688230800,
        end_date: 1688330800,
        capacity: 2,
      })
      .expect(202);
    
    const response = await request(app)
      .post(`/classes/${classId}/enroll`)
      .set({ authorization: token })
      .expect(500);

    let { Error } = response.body;

    expect(Error).toBe("You've already enrolled to this class");
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
