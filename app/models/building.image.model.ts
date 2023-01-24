import {model, Schema, Types} from 'mongoose';
import {IBuildingImage} from "../interfaces/building.image.interface";

const BuildingImageSchema = new Schema<IBuildingImage>({
  buildingId: {type: Types.ObjectId, ref: "Building"},
  image: String,
},{ timestamps: true });

exports.BuildingImage = model<IBuildingImage>('BuildingImage', BuildingImageSchema);
