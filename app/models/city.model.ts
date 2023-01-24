import {model, Schema, Types} from 'mongoose';
import {ICity} from "../interfaces/city.interface";

const CitySchema = new Schema<ICity>({
  name: String,
},{ timestamps: true });

exports.City = model<ICity>('City', CitySchema);

