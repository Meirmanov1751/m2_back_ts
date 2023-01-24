"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
    iin: String,
    avatar: String,
    roles: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Role"
        }
    ]
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
