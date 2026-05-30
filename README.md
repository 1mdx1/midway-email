# midway-email

基于 nodemailer 封装的 Midway 邮件组件，提供便捷的邮件发送能力。

## 安装

```bash
npm install midway-email nodemailer --save
```

## 引入组件

```typescript
// src/configuration.ts
import { Configuration } from '@midwayjs/core';
import * as email from 'midway-email';

@Configuration({
  imports: [email],
})
export class MainConfiguration {}
```

## 配置

在 `src/config/config.default.ts` 中配置 SMTP 参数：

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

### 配置说明

| 属性     | 类型      | 默认值      | 描述          |
| -------- | --------- | ----------- | ------------- |
| host     | `string`  | `localhost` | SMTP 服务器   |
| port     | `number`  | `25`        | SMTP 端口     |
| secure   | `boolean` | `false`     | 是否使用 SSL  |
| auth     | `object`  | -           | 认证信息      |
| auth.user | `string` | -           | 用户名        |
| auth.pass | `string` | -           | 密码          |
| from     | `string`  | `''`        | 默认发件人    |

> 更多配置项参考 [nodemailer SMTPTransport.Options](https://nodemailer.com/smtp/)。

## 使用

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

发送邮件。`mailOptions` 类型为 [nodemailer.SendMailOptions](https://nodemailer.com/message/)。

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

验证 SMTP 连接配置。

```typescript
const ok = await emailService.verify();
```

## License

MIT
