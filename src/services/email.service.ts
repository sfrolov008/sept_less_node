import nademailar from "nodemailer";

import { configs } from "../configs";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nademailar.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
  }
  public async sendMail(email: string) {
    return this.transporter.sendMail({
      from: "no reply",
      to: email,
      subject: "Wellcome",
      html: "<h2>Wellcome to app</h2>",
    });
  }
}

export const emailService = new EmailService();
