"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleWare = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await models_1.User.findById(userId);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            res.locals.user = user;
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
}
exports.userMiddleWare = new UserMiddleware();
