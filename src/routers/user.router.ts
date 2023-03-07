import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleWare } from "../middlewares/user.middleware";
import { userValidMiddleware } from "../middlewares/user.valid.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userMiddleWare.getByIdAndThrow, userController.getById);

router.post("/", userValidMiddleware.createOrUpdate, userController.create);

router.patch(
  "/:userId",
  userValidMiddleware.createOrUpdate,
  userController.update
);

router.delete("/:userId", userController.delete);
export const userRouter = router;
