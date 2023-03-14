"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class UserService {
    async getAll() {
        try {
            return models_1.User.find();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        return models_1.User.findById(id);
    }
}
try {
}
catch (e) {
    throw new errors_1.ApiError(e.message, e.status);
}
exports.userService = new UserService();
