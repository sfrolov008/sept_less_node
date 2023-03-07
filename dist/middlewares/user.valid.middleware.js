"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
class UserValidMiddleware {
  async createOrUpdate(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      if (!name || name.length < 2) {
        throw new api_error_1.ApiError("Name invalid", 400);
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const validEmail = emailRegex.test(email);
      if (!email || !validEmail) {
        throw new api_error_1.ApiError("No email or email invalid", 400);
      }
      const passRegex = /^[a-zA-Z0-9]{8}$/;
      const validPass = passRegex.test(password);
      if (!validPass) {
        throw new api_error_1.ApiError("Password invalid", 400);
        if (!gender || (gender !== "male" && gender !== "female")) {
          throw new api_error_1.ApiError("Gender invalid", 400);
        }
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
exports.userValidMiddleware = new UserValidMiddleware();
