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
    NEXT_PUBLIC_TITLE: string;
    NEXT_PUBLIC_OA: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}
