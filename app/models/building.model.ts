import {model, Schema, Types} from 'mongoose';
import {IBuilding} from "../interfaces/building.interface";

const BuildingSchema = new Schema<IBuilding>({
  name: String,
  address: String,
  passDate: String,
  incomePercentage: Number,
  cityId: {type: Types.ObjectId, ref: "City"},
  totalArea: Number,
  decription: String,
},{ timestamps: true });

exports.Building = model<IBuilding>('Building', BuildingSchema);

