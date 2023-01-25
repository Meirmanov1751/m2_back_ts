require("dotenv").config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require("mongoose");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
});

afterEach(async () =>{
  await mongoose.connection.close()
});

describe("city", () => {
  describe("GET city", () => {
    it("should return a city", async () => {
      const res = await request(app).get("/api/city");
      expect(res.statusCode).toBe(200);
      expect(typeof res.body).toBeDefined()
    });
  });

  describe("POST city", () => {
    it("should create a city", async () => {
      const res = await request(app).post("/api/city").send(
        {
          name: "Nursultan",
        }
      );
      expect(res.statusCode).toBe(200)
      expect(res.body).toBeDefined()
    })
  })

  it('PUT /city/63c5128daf6eb1d367d00484', async () => {
    const res = await request(app).put("/api/city/63c5128daf6eb1d367d00484").send({ name: "Astana" });
    console.log(res.statusCode)
    //expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ _id: "63c5128daf6eb1d367d00484", name: "Astana" });
  });

  it("DELETE /city/63c5128daf6eb1d367d00484", async () => {
    const res = await request(app).delete("/api/city/63c5128daf6eb1d367d00484");
    console.log(res.statusCode)
    //expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });
});

