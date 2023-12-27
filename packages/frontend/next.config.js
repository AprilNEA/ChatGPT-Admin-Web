const fs = require('fs');
const path = require('path');
const CONFIG_FILE = path.join(__dirname, '../../config.json');

const config = fs.existsSync(CONFIG_FILE)
  ? JSON.parse(fs.readFileSync('../../config.json', 'utf8'))
  : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TITLE: config?.brand?.title ?? config?.title ?? 'ChatGPT Admin Web',
    DESCRIPTION:
      config?.brand?.description ??
      config?.description ??
      'Your personal ChatGPT Bot.',
    LOGO: config?.brand?.logo?.index,
    LOGO_BOT: config?.brand?.logo?.bot,
    LOGO_LOGIN: config?.brand?.logo?.login,
    LOGO_LOADING: config?.brand?.logo?.loading,
    LOGO_SIDEBAR: config?.brand?.logo?.sidebar,
    ONBOARDING: config?.brand?.onboarding,
  },
  transpilePackages: ['shared'],
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
        destination: `${
          config?.backend?.url ?? 'http://localhost:3001'
        }/api/:slug*`,
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
