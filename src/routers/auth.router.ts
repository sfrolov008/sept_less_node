import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleWare,
  commonMiddleware,
  userMiddleWare,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleWare.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
  userMiddleWare.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changeUserPass),
  authMiddleWare.checkAccessToken,
  authController.changePassword
);

router.post(
  "/password/forgot",
  userMiddleWare.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  "/password/forgot/:token",
  authMiddleWare.checkActionForgotToken,
  authController.setForgotPassword
);

router.post(
  "/refresh",
  authMiddleWare.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
