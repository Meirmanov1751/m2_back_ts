"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApartmentImageSchema = new mongoose_1.Schema({
    apartmentId: { type: mongoose_1.Types.ObjectId, ref: "Apartment" },
    image: String,
});
exports.ApartmentImage = (0, mongoose_1.model)('ApartmentImage', ApartmentImageSchema);
