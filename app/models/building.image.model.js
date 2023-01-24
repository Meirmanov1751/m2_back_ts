"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BuildingImageSchema = new mongoose_1.Schema({
    buildingId: { type: mongoose_1.Types.ObjectId, ref: "Building" },
    image: String,
});
exports.BuildingImage = (0, mongoose_1.model)('BuildingImage', BuildingImageSchema);
