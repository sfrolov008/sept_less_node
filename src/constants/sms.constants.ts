import { ESmsActions } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActions.WELCOME]: "WELCOME_WELCOME_WELCOME",

  [ESmsActions.FORGOT_PASSWORD]: "FORGOT_FORGOT_FORGOT_PASSWORD",
};
