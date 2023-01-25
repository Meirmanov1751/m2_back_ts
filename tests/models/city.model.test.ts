require("dotenv").config();
const mongoose = require("mongoose");

const {City} = require("../../app/models/city.model")

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
});

afterEach(async () =>{
  await mongoose.connection.close()
});

describe("City Model", () => {
  it("should return all city", async () => {
    const city = await City.find();
    expect(city.length).toBeGreaterThan(0);
  });
});
