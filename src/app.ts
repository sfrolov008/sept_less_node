import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { authRouter } from "./routers";
import { userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({ message: err.message, status });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server was started on PORT ${configs.PORT}`);
});
