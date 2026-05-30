import { Provide, Config, Inject } from '@midwayjs/core';
import * as nodemailer from 'nodemailer';
import { SendMailOptions } from 'nodemailer';
import type { EmailConfig } from '../interface';

@Provide()
export class EmailService {
  @Inject('emailTransporter')
  private transporter: nodemailer.Transporter;

  @Config('email')
  private emailConfig: EmailConfig;

  async send(mailOptions: SendMailOptions) {
    return this.transporter.sendMail({
      from: this.emailConfig.from,
      ...mailOptions,
    });
  }

  async verify() {
    return this.transporter.verify();
  }

  close() {
    this.transporter.close();
  }
}
