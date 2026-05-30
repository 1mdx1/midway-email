import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface EmailConfig extends SMTPTransport.Options {
  from?: string;
}
