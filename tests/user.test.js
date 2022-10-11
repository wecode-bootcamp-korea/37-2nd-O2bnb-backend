const request = require("supertest");

const { createApp } = require("../app");

const dataSource = require("../src/models/dataSource");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {

    app = createApp();
    await dataSource.initialize();
  });

<<<<<<< HEAD
  test("FAIL :INVALID_TOKEN", async () => {
=======
  test("FAIL : INVALID_TOKEN", async () => {
>>>>>>> feature/getProducts

    await request(app)
      .post("/product/all") 
      .set({Authorization: "ddd"})
      .expect(400) 
      .expect({ message: "INVALID_TOKEN" });
  });


  test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/signup")
      .set({Authorization: "ddd"})
      .expect(201)
      .expect({message : "success"});
  });

});