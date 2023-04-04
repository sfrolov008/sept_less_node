import { Router } from "express";

import { carController } from "../controllers";
import {
  authMiddleWare,
  carMiddleware,
  commonMiddleware,
} from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.post(
  "/",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.createCar),
  carController.create
);

router.get(
  "/:carId",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.put(
  "/:carId",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.updateCar),
  carMiddleware.getByIdOrThrow,
  carController.update
);
router.delete(
  "/:carId",
  authMiddleWare.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete
);

export const carRouter = router;
