import {model, Schema, Types} from 'mongoose';
import {INews} from "../interfaces/news.interface";

const NewsSchema = new Schema<INews>({
  title: String,
  content: String
},{ timestamps: true });

exports.News = model<INews>('News', NewsSchema);
