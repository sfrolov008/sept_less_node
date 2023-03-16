import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.locals = { user };
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldToSearch = req[from][fieldName];
        const user = await User.findOne({ [dbField]: fieldToSearch });
        if (user) {
          throw new ApiError(
            `User with ${fieldName}: ${fieldToSearch} already exist`,
            404
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public getDynamicallyOrThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldToSearch = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldToSearch });

        if (!user) {
          throw new ApiError(`User not found`, 422);
        }

        req.res.locals = { user };

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleWare = new UserMiddleware();
