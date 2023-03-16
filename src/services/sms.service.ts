import { Twilio } from "twilio";

import { configs } from "../configs";
import { smsTemplates } from "../constants/sms.constants";
import { ESmsActions } from "../enums";

class SmsService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsAction: ESmsActions) {
    try {
      const message = smsTemplates[smsAction];

      await this.client.messages.create({
        body: message,
        to: phone,
        from: "+1 507 428 7728",
      });
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
    }
  }
}

export const smsService = new SmsService();
