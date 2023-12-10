export interface ConfigType {
  mode: 'nginx' | 'docker' | 'debug';
  title: string;
  frontend: {
    port: number;
    url: string;
  };
  backend: {
    port: number;
    url: string;
  };
  /* Deprecated in 3.1 */
  port?: {
    frontend: number;
    backend: number;
  };
  jwt: {
    algorithm: 'HS256' | 'ES256';
    secret?: string;
    publicKey?: string;
    privateKey?: string;
  };
  redis: {
    url: string;
  };
  postgres: {
    url: string;
  };
  openai: {
    baseUrl: string;
    keys: string;
  };
  sms: {
    use?: 'disable' | 'aliyun' | 'tencent' | 'uni';
    uni?: {
      signature: string;
      templateId: string;
      apiKey: string;
      apiSecret?: string;
    };
  };
  email: {
    use?: 'disable' | 'smtp' | 'resend' | 'mailgun' | 'elastic';
    domain: string;
    sender?: string;
    smtp: {};
    resend: {
      apiKey: string;
    };
    mailgun: {
      apiKey: string;
      domain: string;
    };
    elastic: {
      apiKey: string;
    };
  };
  wechat: {
    oauth: {
      appId: string;
      appSecret: string;
    };
  };
  payment: {
    use: 'xunhu';
    xunhu?: {
      wapName: string;
      appId: string;
      appSecret: string;
      notifyUrl: string;
      returnUrl: string;
    };
  };
}
