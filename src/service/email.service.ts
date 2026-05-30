import { Provide, Config, Init } from '@midwayjs/core';
import * as nodemailer from 'nodemailer';
import { SendMailOptions } from 'nodemailer';
import type { EmailConfig } from '../interface';

@Provide()
export class EmailService {
  private transporter: nodemailer.Transporter;

  @Config('email')
  private emailConfig: EmailConfig;

  @Init()
  async init() {
    this.transporter = nodemailer.createTransport(this.emailConfig);
  }

  async send(mailOptions: SendMailOptions) {
    return this.transporter.sendMail({
      from: this.emailConfig.from,
      ...mailOptions,
    });
  }

  async verify() {
    return this.transporter.verify();
  }
}
