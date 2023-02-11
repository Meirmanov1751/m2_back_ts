import mongoose from "mongoose";

export interface IRefreshtokenInterface extends mongoose.Document{
  token: string,
  user: any,
  expiryDate: string
}
