"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleWare = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api.error");
const User_model_1 = require("../models/User.model");
const user_validator_1 = require("../validators/user.validator");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_model_1.User.findById(userId);
            if (!user) {
                throw new api_error_1.ApiError("User not found", 404);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValid(req, res, next) {
        try {
            if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.userId)) {
                throw new api_error_1.ApiError("ID not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidCreate(req, res, next) {
        try {
            const { error, value } = user_validator_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new api_error_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidUpdate(req, res, next) {
        try {
            const { error, value } = user_validator_1.UserValidator.updateUser.validate(req.body);
            if (error) {
                throw new api_error_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleWare = new UserMiddleware();
