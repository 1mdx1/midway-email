# midway-email

A Midway component wrapping nodemailer for convenient email sending.

## Installation

```bash
npm install midway-email nodemailer --save
```

## Usage

Import the component in your configuration:

```typescript
// src/configuration.ts
import { Configuration } from '@midwayjs/core';
import * as email from 'midway-email';

@Configuration({
  imports: [email],
})
export class MainConfiguration {}
```

## Configuration

Configure SMTP settings in `src/config/config.default.ts`:

```typescript
export const email = {
  host: 'smtp.example.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your@example.com',
    pass: 'your-password',
  },
  from: '"Sender" <your@example.com>',
};
```

### Options

| Property  | Type      | Default     | Description            |
| --------- | --------- | ----------- | ---------------------- |
| host      | `string`  | `localhost` | SMTP server host       |
| port      | `number`  | `25`        | SMTP server port       |
| secure    | `boolean` | `false`     | Use SSL (true for 465) |
| auth      | `object`  | -           | Authentication         |
| auth.user | `string`  | -           | Username               |
| auth.pass | `string`  | -           | Password               |
| from      | `string`  | `''`        | Default sender address |

> See [nodemailer SMTPTransport.Options](https://nodemailer.com/smtp/) for all options.

## Example

```typescript
import { Provide, Inject } from '@midwayjs/core';
import { EmailService } from 'midway-email';

@Provide()
export class UserService {

  @Inject()
  emailService: EmailService;

  async sendWelcome() {
    await this.emailService.send({
      to: 'user@example.com',
      subject: 'Welcome!',
      text: 'Hello from Midway',
      html: '<h1>Hello from Midway</h1>',
    });
  }
}
```

### API

#### `send(mailOptions)`

Send an email. `mailOptions` follows [nodemailer.SendMailOptions](https://nodemailer.com/message/).

```typescript
await emailService.send({
  to: 'user@example.com',
  cc: 'cc@example.com',
  bcc: 'bcc@example.com',
  subject: 'Subject',
  text: 'Plain text body',
  html: '<p>HTML body</p>',
  attachments: [
    { filename: 'file.txt', content: 'attachment content' },
  ],
});
```

#### `verify()`

Verify SMTP connection configuration.

```typescript
const ok = await emailService.verify();
```

## License

MIT
