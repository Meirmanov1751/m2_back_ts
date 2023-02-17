import {model, Schema, Types} from 'mongoose';
import {IBuilding} from "../interfaces/building.interface";
const BuildingImage = require("./building.image.model")

const BuildingSchema = new Schema<IBuilding>({
  name: String,
  address: String,
  passDate: String,
  incomePercentage: Number,
  cityId: {type: Types.ObjectId, ref: "City"},
  totalArea: Number,
  decription: String,
  images:[
    {
      type: Schema.Types.ObjectId,
      ref: "BuildingImage",
    },
  ],
},{ timestamps: true });

exports.Building = model<IBuilding>('Building', BuildingSchema);

