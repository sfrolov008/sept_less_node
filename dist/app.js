"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = require("./routers/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
app.use((err, req, res, next) => {
  return res
    .status(err.status)
    .json({ message: err.message, status: err.status });
});
const PORT = 5200;
app.listen(PORT, () => {
  mongoose_1.default.connect("mongodb://127.0.0.1:27017/sept_less_node");
  console.log(`Server was started on PORT ${PORT}`);
});
