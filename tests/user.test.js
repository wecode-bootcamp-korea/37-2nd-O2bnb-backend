const request = require("supertest");

const { createApp } = require("../app");

const { dataSource } = require("../src/models/dataSource");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {

    app = createApp();
    await dataSource.initialize();
  });

  test("FAILED: NO_AUTHCODE", async () => {

    await request(app)
      .post("/users/signup") 
      .send({ email: "wrongEmail", password: "password001@" }) 
      .expect(400) 
      .expect({ message: "invalid email!" });
  });


  test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({ email: "wecode001@gmail.com", password: "password001@" })
      .expect(201)
      .expect({message : "success"});
  });

  test("FAILED: duplicated email", async () => {
    await request(app)
      .post("/users/signup")
      .send({ email: "wecode001@gmail.com", password: "password001@" })
      .expect(409)
      .expect({ message: "duplicated email" });
  });
});