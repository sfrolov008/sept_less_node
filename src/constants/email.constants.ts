import { EEmailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "WELCOME_WELCOME_WELCOME",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "FORGOT_FORGOT_FORGOT_PASSWORD",
    templateName: "forgotPassword",
  },
  [EEmailActions.ACTIVATE]: {
    subject: "Activate your App",
    templateName: "activate",
  },
  [EEmailActions.REMINDER]: {
    subject: "Welcome",
    templateName: "reminder",
  },
};
