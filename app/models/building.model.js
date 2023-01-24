"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BuildingSchema = new mongoose_1.Schema({
    name: String,
    address: String,
    passDate: String,
    incomePercentage: Number,
    cityId: { type: mongoose_1.Types.ObjectId, ref: "City" },
    totalArea: Number,
    decription: String,
});
exports.Building = (0, mongoose_1.model)('Building', BuildingSchema);
