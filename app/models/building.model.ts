import {model, Schema, Types} from 'mongoose';
import {IBuilding} from "../interfaces/building.interface";

const BuildingSchema = new Schema<IBuilding>({
  name: String,
  address: String,
  passDate: Date,
  incomePercentage: Number,
  cityId: {type: Types.ObjectId, ref: "City"},
  totalArea: Number,
  description: String,
},{ timestamps: true });

exports.Building = model<IBuilding>('Building', BuildingSchema);

