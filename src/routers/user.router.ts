import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleWare,
  commonMiddleware,
  userMiddleWare,
} from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleWare.getByIdAndThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleWare.getByIdAndThrow,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleWare.getByIdAndThrow,
  userController.delete
);

router.put(
  "/:userId/avatar",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.isAvatarValid,
  userMiddleWare.getByIdAndThrow,
  userController.uploadAvatar
);

router.delete(
  "/:userId/avatar",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleWare.getByIdAndThrow,
  userController.deleteAvatar
);
export const userRouter = router;
