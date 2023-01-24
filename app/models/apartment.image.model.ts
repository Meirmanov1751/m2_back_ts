import {model, Schema, Types} from 'mongoose';
import {IApartmentImage} from "../interfaces/apartment.image.interface";

const ApartmentImageSchema = new Schema<IApartmentImage>({
  apartmentId: {type: Types.ObjectId, ref: "Apartment"},
  image: String,
},{ timestamps: true });

exports.ApartmentImage = model<IApartmentImage>('ApartmentImage', ApartmentImageSchema);
