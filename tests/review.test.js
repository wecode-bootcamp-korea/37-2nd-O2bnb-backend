const request = require("supertest");

const { createApp } = require("../app");
const dataSource = require("../src/models/dataSource");

describe("Get Reviews", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  test("SUCCESS: get reviews for a product", async () => {
    await request(app)
      .get("/reviews/1")
      .expect(200)
      .expect({
        "data": {
            "stars": [
                {
                    "total": "3",
                    "totalAVG": "3.5556",
                    "cleanAvg": "4.3333",
                    "addressAvg": "2.0000",
                    "priceAvg": "4.3333"
                }
            ],
            "reviews": [
                {
                    "id": "1",
                    "created_at": "2022-10",
                    "content": "깔끔하고 침구가 너무 맘에 들었어요. 안락한 느낌 따뜻한 조명까지! 구비된 물품도 많고 주변이 조용해서 한적하니 힐링 여행으로 딱 좋은 숙소였어요 ㅎㅎ",
                    "name": "이경은",
                    "profile_image": "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg"
                },
                {
                    "id": "2",
                    "created_at": "2022-10",
                    "content": "깔끔하고 침구가 너무 맘에 들었어요. 안락한 느낌 따뜻한 조명까지! 구비된 물품도 많고 주변이 조용해서 한적하니 힐링 여행으로 딱 좋은 숙소였어요 ㅎㅎ",
                    "name": "이경은",
                    "profile_image": "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg"
                },
                {
                    "id": "3",
                    "created_at": "2022-10",
                    "content": "깔끔하고 침구가 너무 맘에 들었어요. 안락한 느낌 따뜻한 조명까지! 구비된 물품도 많고 주변이 조용해서 한적하니 힐링 여행으로 딱 좋은 숙소였어요 ㅎㅎ",
                    "name": "이경은",
                    "profile_image": "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg"
                }
            ]
        }
    });
  });
});