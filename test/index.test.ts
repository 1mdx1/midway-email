import { createLightApp, close } from '@midwayjs/mock';
import * as custom from '../src';

describe('/test/index.test.ts', () => {
  it('should load component and get EmailService', async () => {
    const app = await createLightApp('', {
      imports: [
        custom
      ]
    });
    const emailService = await app.getApplicationContext().getAsync(custom.EmailService);
    expect(emailService).toBeDefined();
    expect(emailService.send).toBeDefined();
    expect(emailService.verify).toBeDefined();
    expect(emailService.close).toBeDefined();
    await close(app);
  });

  it('should create transporter with custom config', async () => {
    const app = await createLightApp('', {
      imports: [
        custom
      ],
      config: {
        email: {
          host: 'smtp.example.com',
          port: 587,
          secure: false,
          auth: {
            user: 'test@example.com',
            pass: 'password',
          },
          from: '"Test" <test@example.com>',
        }
      }
    });
    const emailService = await app.getApplicationContext().getAsync(custom.EmailService);
    expect(emailService).toBeDefined();
    await close(app);
  });
});
