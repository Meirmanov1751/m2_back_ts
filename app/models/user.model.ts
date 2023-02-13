import {model, Schema, Types} from 'mongoose';
import {IUser} from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>({
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  phone: String,
  password: String,
  iin: String,
  avatar: String,
  roles: [
    {
      type: Types.ObjectId,
      ref: "Role"
    }
  ]
},{ timestamps: true });
const User = model<IUser>('User', UserSchema);
export {User}



