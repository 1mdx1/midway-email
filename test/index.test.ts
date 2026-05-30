import { createLightApp } from '@midwayjs/mock';
import * as custom from '../src';

describe('/test/index.test.ts', () => {
  it('test component', async () => {
    const app = await createLightApp('', {
      imports: [
        custom
      ]
    });
    const emailService = await app.getApplicationContext().getAsync(custom.EmailService);
    expect(emailService).toBeDefined();
  });
});
