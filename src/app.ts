import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(err.status)
    .json({ message: err.message, status: err.status });
});

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB_URL);
  console.log(`Server was started on PORT ${process.env.PORT}`);
});
