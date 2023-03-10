import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleWare } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleWare.isUserValidCreate, userController.create);

router.get(
  "/:userId",
  userMiddleWare.isUserValid,
  userMiddleWare.getByIdAndThrow,
  userController.getById
);

router.patch(
  "/:userId",
  userMiddleWare.isUserValid,
  userMiddleWare.isUserValidUpdate,
  userMiddleWare.getByIdAndThrow,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleWare.isUserValid,
  userMiddleWare.getByIdAndThrow,
  userController.delete
);
export const userRouter = router;
