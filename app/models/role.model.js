"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RoleSchema = new mongoose_1.Schema({
    name: String,
});
exports.Role = (0, mongoose_1.model)('Role', RoleSchema);
