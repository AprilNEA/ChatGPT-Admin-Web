declare module '*.jpg';
declare module '*.png';
declare module '*.woff2';
declare module '*.woff';
declare module '*.ttf';
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.svg';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    TITLE: string;
    DESCRIPTION: string;

    LOGO?: string;
    LOGO_BOT?: string;
    LOGO_LOGIN?: string;
    LOGO_LOADING?: string;
    LOGO_SIDEBAR?: string;

    ONBOARDING?: string;
  }
}
