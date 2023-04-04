import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userMapper } from "../mapper";
import { IQuery, userService } from "../services";
import { IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getWithPagination(
        req.query as unknown as IQuery
      );

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;
      const response = userMapper.toResponse(user);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  // public async create(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response<ICommonResponse<IUser>>> {
  //   try {
  //     const body = req.body;
  //     const user = await User.create(body);
  //
  //     return res.status(201).json({
  //       message: "User created!",
  //       data: user,
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { params, body } = req;

      const updatedUser = await userService.update(params.userId, body);

      const response = userMapper.toResponse(updatedUser);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      await userService.delete(userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const userEntity = res.locals.user as IUser;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(avatar, userEntity);

      const response = userMapper.toResponse(user);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const userEntity = res.locals.user as IUser;
      const user = await userService.deleteAvatar(userEntity);
      const response = userMapper.toResponse(user);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
