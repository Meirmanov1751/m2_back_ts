import {model, Schema, Types} from 'mongoose';
import {INewsImage} from "../interfaces/news.image.interface";

const NewsImageSchema = new Schema<INewsImage>({
  NewsId: {type: Types.ObjectId, ref: "News"},
  s3Key: String,
  bucket: String,
  mime: String,
  comment: String,
},{ timestamps: true });

exports.NewsImageSchema = NewsImageSchema;
exports.NewsImage = model<INewsImage>('NewsImage', NewsImageSchema);
