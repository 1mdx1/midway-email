import { Configuration } from '@midwayjs/core';
import * as DefaultConfig from './config/config.default';

@Configuration({
  namespace: 'midway-email',
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class EmailConfiguration {
  async onReady() {
    // TODO something
  }
}
