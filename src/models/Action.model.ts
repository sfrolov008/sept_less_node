import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enums/action-token-type";
import { User } from "./User.model";

const actoinTokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      enum: EActionTokenType,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Action = model("Action", actoinTokenSchema);
