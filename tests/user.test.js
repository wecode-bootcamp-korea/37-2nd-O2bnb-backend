const request = require("supertest");

const { createApp } = require("../app");
const dataSource = require("../src/models/dataSource");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {

    app = createApp();
    await dataSource.initialize();
  });

  test("FAIL :INVALID_TOKEN", async () => {

<<<<<<< HEAD
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

=======
  test("FAILED: invalid token", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post("/product/all") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: "KEY_ERROR" });
  });

  // 다음과 같이 본인이 작성한 코드에 맞춰 다양한 케이스를 모두 테스트해야 합니다.
  // 그래야 의도에 맞게 코드가 잘 작성되었는지 테스트 단계에서부터 확인할 수 있습니다!
  // test("SUCCESS: created user", async () => {
  //   await request(app)
  //     .post("/users/signup")
  //     .send({ email: "wecode001@gmail.com", password: "password001@" })
  //     .expect(201)
  //     .expect({message : "success"});
  // });

  // test("FAILED: duplicated email", async () => {
  //   await request(app)
  //     .post("/users/signup")
  //     .send({ email: "wecode001@gmail.com", password: "password001@" })
  //     .expect(409)
  //     .expect({ message: "duplicated email" });
  // });
>>>>>>> c480659... wip
});