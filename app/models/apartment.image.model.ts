import {model, Schema, Types} from 'mongoose';
import {IApartmentImage} from "../interfaces/apartment.image.interface";

const ApartmentImageSchema = new Schema<IApartmentImage>({
  apartmentId: {type: Types.ObjectId, ref: "Apartment"},
  s3Key: String,
  bucket: String,
  mime: String,
  comment: String,
},{ timestamps: true });

exports.ApartmentImage = model<IApartmentImage>('ApartmentImage', ApartmentImageSchema);
