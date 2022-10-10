// tests/user.test.js

// npm i --save-dev supertest
const request = require("supertest");

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require("../app");
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const dataSource = require("../src/models/dataSource");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await dataSource.initialize();
  });

  /*
  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await dataSource.query(`TRUNCATE users`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await dataSource.destroy();
  });
  */

  test("FAILED: TOKEN DOESN'T EXIST", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .get("/product/detail/4") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .set('Authorization', 'asdf')
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
  // })

  // test("FAILED: duplicated email", async () => {
  //   await request(app)
  //     .post("/users/signup")
  //     .send({ email: "wecode001@gmail.com", password: "password001@" })
  //     .expect(409)
  //     .expect({ message: "duplicated email" });
  // });
});