const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('../../config.yaml', 'utf8'));
const isProd = process.env.NODE_ENV === 'production';
const BACKEND_BASE = config?.url?.backend ?? 'http://localhost:3001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  env: {
    NEXT_PUBLIC_TITLE: config?.site?.title ?? 'ChatGPT Admin Web',
    NEXT_PUBLIC_OA: config?.site?.oa,
    NEXT_PUBLIC_BASE_URL: config?.url?.backend ?? 'http://localhost:3001',
    NEXT_PUBLIC_WECHAT_MP_APP_ID: config?.wechat?.mp?.appId,
    NEXT_PUBLIC_WECHAT_OAUTH_APP_ID: config?.wechat?.oauth?.appId,
    NEXT_PUBLIC_WECHAT_OAUTH_REDIRECT_URL: config?.wechat?.oauth?.redirectUrl,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
    rewrites: () => {
      return [
        {
          source: '/api/:slug*',
          destination: `${BACKEND_BASE}/api/:slug*`,
        },
      ];
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mp.weixin.qq.com',
      },
    ],
  },
};

module.exports = nextConfig;
