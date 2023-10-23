export interface ConfigType {
  debug: boolean;
  port: {
    frontend: number;
    backend: number;
  };
  jwt: {
    algorithm: string;
    secret: string;
    publicKey: string;
    privateKey: string;
  };
  redis: {
    url: string;
  };
  postgres: {
    url: string;
  };
  openai: {
    baseUrl?: string;
    endpoint?: string;
    keys: string[];
    keyPath: string;
  };
  email: {
    use: "resend";
    resend?: {
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
    xunhu: {
      wapName: string;
      appId: string;
      appSecret: string;
      notifyUrl: string;
      returnUrl: string;
    };
  };
}
