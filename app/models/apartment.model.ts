import {model, Schema, Types} from 'mongoose';
import {IApartment} from "../interfaces/apartment.interface";

const ApartmentSchema = new Schema<IApartment>({
  name: String,
  area: Number,
  soldArea: Number,
  building: {type: Types.ObjectId, ref: "Building"},
});

exports.Apartment = model<IApartment>('Apartment', ApartmentSchema);

