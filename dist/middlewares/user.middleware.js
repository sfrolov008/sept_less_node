"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleWare = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const models_1 = require("../models");
const validators_1 = require("../validators");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await models_1.User.findById(userId);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            res.locals = { user };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    getDynamicallyAndThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldToSearch = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldToSearch });
                if (user) {
                    throw new errors_1.ApiError(`User with ${fieldName}: ${fieldToSearch} already exist`, 404);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    getDynamicallyOrThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldToSearch = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldToSearch });
                if (!user) {
                    throw new errors_1.ApiError(`User not found`, 422);
                }
                req.res.locals = { user };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async isValid(req, res, next) {
        try {
            if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.userId)) {
                throw new errors_1.ApiError("ID not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isValidCreate(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isValidUpdate(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.updateUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isValidLogin(req, res, next) {
        try {
            const { error } = validators_1.UserValidator.loginUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleWare = new UserMiddleware();
