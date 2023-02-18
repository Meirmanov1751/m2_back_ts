import {model, Schema} from 'mongoose';
import {IRole} from "../interfaces/role.interface";

const RoleSchema = new Schema<IRole>({
  name: String,
},{ timestamps: true });
export const Role = model<IRole>('Role', RoleSchema);
