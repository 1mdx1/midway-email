import { Configuration, Config, IMidwayContainer } from '@midwayjs/core';
import * as nodemailer from 'nodemailer';
import * as DefaultConfig from './config/config.default';
import type { EmailConfig } from './interface';

export const EmailTransporterKey = 'emailTransporter';

@Configuration({
  namespace: 'midway-email',
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class EmailConfiguration {
  @Config('email')
  emailConfig: EmailConfig;

  async onReady(container: IMidwayContainer) {
    const transporter = nodemailer.createTransport(this.emailConfig);
    container.registerObject(EmailTransporterKey, transporter);
  }

  async onStop(container: IMidwayContainer) {
    const transporter =
      container.get<nodemailer.Transporter>(EmailTransporterKey);
    if (transporter) {
      transporter.close();
    }
  }
}
