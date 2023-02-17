import {model, Schema, Types} from 'mongoose';
import {IApartment} from "../interfaces/apartment.interface";
const ApartmentImageSchema = require("./apartment.image.model")

const ApartmentSchema = new Schema<IApartment>({
  name: String,
  area: Number,
  soldArea: Number,
  building: {type: Types.ObjectId, ref: "Building"},
},{ timestamps: true }
);

exports.Apartment = model<IApartment>('Apartment', ApartmentSchema);

