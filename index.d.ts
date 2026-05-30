export * from './dist/index';

declare module '@midwayjs/core' {
  interface MidwayConfig {
    email?: {
      host?: string;
      port?: number;
      secure?: boolean;
      auth?: {
        user: string;
        pass: string;
      };
      from?: string;
      [key: string]: any;
    };
  }
}
