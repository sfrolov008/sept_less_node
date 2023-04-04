import { removeOldPasswords } from "./remove.old.password.cron";
import { removeOldTokens } from "./remove.old.token.cron";
import { sendRemaiderEmail } from "./send. reminder.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
  sendRemaiderEmail.start();
};
