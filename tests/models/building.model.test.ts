require("dotenv").config();
const mongoose = require("mongoose");

const {Building} = require("../../app/models/building.model")

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
});

afterEach(async () =>{
  await mongoose.connection.close()
});

describe("Building Model", () => {
  it("should return all building", async () => {
    const building = await Building.find();
    expect(building.length).toBeGreaterThan(0);
  });
});
