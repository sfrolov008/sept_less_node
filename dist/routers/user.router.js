"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
const user_valid_middleware_1 = require("../middlewares/user.valid.middleware");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.userController.getAll);
router.get(
  "/:userId",
  user_middleware_1.userMiddleWare.getByIdAndThrow,
  user_controller_1.userController.getById
);
router.post(
  "/",
  user_valid_middleware_1.userValidMiddleware.createOrUpdate,
  user_controller_1.userController.create
);
router.patch(
  "/:userId",
  user_valid_middleware_1.userValidMiddleware.createOrUpdate,
  user_controller_1.userController.update
);
router.delete("/:userId", user_controller_1.userController.delete);
exports.userRouter = router;
