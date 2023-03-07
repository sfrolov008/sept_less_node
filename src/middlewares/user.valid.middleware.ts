import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

class UserValidMiddleware {
  public async createOrUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, gender } = req.body;
      if (!name || name.length < 2) {
        throw new ApiError("Name invalid", 400);
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const validEmail = emailRegex.test(email);
      if (!email || !validEmail) {
        throw new ApiError("No email or email invalid", 400);
      }

      const passRegex = /^[a-zA-Z0-9]{8}$/;
      const validPass = passRegex.test(password);
      if (!validPass) {
        throw new ApiError("Password invalid", 400);

        if (!gender || (gender !== "male" && gender !== "female")) {
          throw new ApiError("Gender invalid", 400);
        }
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userValidMiddleware = new UserValidMiddleware();
