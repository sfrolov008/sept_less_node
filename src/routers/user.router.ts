import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleWare, userMiddleWare } from "../middlewares";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleWare.isValidCreate, userController.create);

router.get(
  "/:userId",
  authMiddleWare.checkAccessToken,
  userMiddleWare.isValid,
  userMiddleWare.getByIdAndThrow,
  userController.getById
);

router.patch(
  "/:userId",
  authMiddleWare.checkAccessToken,
  userMiddleWare.isValid,
  userMiddleWare.isValidUpdate,
  userMiddleWare.getByIdAndThrow,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleWare.checkAccessToken,
  userMiddleWare.isValid,
  userMiddleWare.getByIdAndThrow,
  userController.delete
);
export const userRouter = router;
