import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5100,
  DB_URL: process.env.DB_URL || "jfsdlkfjdsaklfdas",

  ACCESS_WORD: process.env.ACCESS_WORD || "XXX",
  REFRESH_WORD: process.env.REFRESH_WORD || "SSS",

  ACTIVATE_WORD: process.env.ACTIVATE_WORD,
  FORGOT_WORD: process.env.FORGOT_WORD,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,

  FRONT_URL: process.env.FRONT_URL,

  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_URL: process.env.AWS_S3_URL,
  AWS_S3_ACL: process.env.AWS_S3_ACL,

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
};
