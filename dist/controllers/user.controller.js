"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const mapper_1 = require("../mapper");
const services_1 = require("../services");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await services_1.userService.getWithPagination(req.query);
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { user } = res.locals;
            const response = mapper_1.userMapper.toResponse(user);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { params, body } = req;
            const updatedUser = await services_1.userService.update(params.userId, body);
            const response = mapper_1.userMapper.toResponse(updatedUser);
            return res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await services_1.userService.delete(userId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            const userEntity = res.locals.user;
            const avatar = req.files.avatar;
            const user = await services_1.userService.uploadAvatar(avatar, userEntity);
            const response = mapper_1.userMapper.toResponse(user);
            return res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteAvatar(req, res, next) {
        try {
            const userEntity = res.locals.user;
            const user = await services_1.userService.deleteAvatar(userEntity);
            const response = mapper_1.userMapper.toResponse(user);
            return res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
