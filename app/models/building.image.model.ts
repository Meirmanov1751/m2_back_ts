import {model, Schema, Types} from 'mongoose';
import {IBuildingImage} from "../interfaces/building.image.interface";

const BuildingImageSchema = new Schema<IBuildingImage>({
  buildingId: {type: Types.ObjectId, ref: "Building"},
  s3Key: String,
  bucket: String,
  mime: String,
  comment: String,
  isCover: Boolean,
},{ timestamps: true });

exports.BuildingImageSchema
exports.BuildingImage = model<IBuildingImage>('BuildingImage', BuildingImageSchema);
