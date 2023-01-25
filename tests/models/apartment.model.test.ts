require("dotenv").config();
const mongoose = require("mongoose");

const {Apartment} = require("../../app/models/apartment.model")

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
});

afterEach(async () =>{
  await mongoose.connection.close()
});

describe("Apartment Model", () => {
  it("should return all apartment", async () => {
    const apartment = await Apartment.find();
    expect(apartment.length).toBeGreaterThan(0);
  });
});
