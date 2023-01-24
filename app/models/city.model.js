"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CitySchema = new mongoose_1.Schema({
    name: String,
});
exports.City = (0, mongoose_1.model)('City', CitySchema);
