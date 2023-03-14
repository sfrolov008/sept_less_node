"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../enum");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    gender: {
        type: String,
        enum: enum_1.EGenders,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("user", userSchema);
