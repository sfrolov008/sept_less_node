"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = require("./routers/user.router");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
app.use((err, req, res, next) => {
    return res
        .status(err.status)
        .json({ message: err.message, status: err.status });
});
app.listen(process.env.PORT, () => {
    mongoose_1.default.connect(process.env.DB_URL);
    console.log(`Server was started on PORT ${process.env.PORT}`);
});
