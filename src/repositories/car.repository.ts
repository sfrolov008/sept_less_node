import { Types } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async getUserAndCar(userId: string, carId: string): Promise<ICar> {
    const result = await Car.aggregate([
      {
        $match: {
          _id: carId,
          user: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
    ]);
    return result[0];
  }
}

export const carRepository = new CarRepository();
