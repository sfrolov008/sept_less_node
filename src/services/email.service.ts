import path from "node:path";

import EmailTemplates from "email-templates";
import nodemailer from "nodemailer";

import { configs } from "../configs";
import { allTemplates } from "../constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "publics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "publics", "css"),
        },
      },
    });
  }

  public async sendMail(
    email: string,
    emailAction: EEmailActions,
    locals: Record<string, string> = {}
  ) {
    const templateInfo = allTemplates[emailAction];
    locals.frontUrl = configs.FRONT_URL;

    const html = await this.templateParser.render(
      templateInfo.templateName,
      locals
    );
    return this.transporter.sendMail({
      from: "no reply",
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}

export const emailService = new EmailService();
