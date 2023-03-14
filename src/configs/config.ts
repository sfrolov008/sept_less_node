import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5100,
  DB_URL: process.env.DB_URL || "jfsdlkfjdsaklfdas",

  ACCESS_WORD: process.env.ACCESS_WORD || "XXX",
  REFRESH_WORD: process.env.REFRESH_WORD || "SSS",

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
