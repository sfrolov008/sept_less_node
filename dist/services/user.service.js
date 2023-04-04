"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const s3_service_1 = require("./s3.service");
class UserService {
    async getWithPagination(query) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 5, sortedBy = "createdAt", ...searchObject } = queryObj;
            const skip = limit * (page - 1);
            const users = await models_1.User.find(searchObject)
                .limit(limit)
                .skip(skip)
                .sort(sortedBy)
                .lean();
            const usersTotalCount = await models_1.User.count();
            return {
                page: +page,
                itemsCount: usersTotalCount,
                perPage: +limit,
                itemsFound: users.length,
                data: users,
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return models_1.User.findById(id);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async update(userId, data) {
        try {
            return await models_1.User.findByIdAndUpdate(userId, data, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async delete(userId) {
        try {
            await models_1.User.deleteOne({ _id: userId });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async uploadAvatar(file, user) {
        try {
            const filePath = await s3_service_1.s3Service.uploadPhoto(file, "user", user._id);
            if (user.avatar) {
                await s3_service_1.s3Service.deletePhoto(user.avatar);
            }
            return await models_1.User.findByIdAndUpdate(user._id, { avatar: filePath }, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async deleteAvatar(user) {
        try {
            if (!user.avatar) {
                throw new errors_1.ApiError("User doesnt have avatar", 422);
            }
            await s3_service_1.s3Service.deletePhoto(user.avatar);
            return await models_1.User.findByIdAndUpdate(user._id, { $unset: { avatar: true } }, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.userService = new UserService();
