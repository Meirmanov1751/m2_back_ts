import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  phone: string,
  password: string,
  iin: string,
  avatar: string,
  roles: any
}
