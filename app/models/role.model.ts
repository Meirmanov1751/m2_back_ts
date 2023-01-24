import {model, Schema} from 'mongoose';
import {IRole} from "../interfaces/role.interface";

const RoleSchema = new Schema<IRole>({
  name: String,
});

exports.Role = model<IRole>('Role', RoleSchema);
