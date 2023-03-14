import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleWare, userMiddleWare } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleWare.isValidCreate,
  userMiddleWare.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  userMiddleWare.isValidLogin,
  userMiddleWare.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleWare.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
