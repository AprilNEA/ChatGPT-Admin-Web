const fs = require('fs');
const path = require('path');
const CONFIG_FILE = path.join(__dirname, '../../config.json');

const config = fs.existsSync(CONFIG_FILE)
  ? JSON.parse(fs.readFileSync('../../config.json', 'utf8'))
  : {
      mode: 'dev',
      title: 'ChatGPT Admin Web',
      port: {
        frontend: 3000,
        backend: 3001,
      },
      jwt: {
        algorithm: 'HS256',
      },
    };

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_TITLE: config?.title ?? 'ChatGPT Admin Web',
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
        destination: `http://localhost:${
          config.port.backend ?? '3001'
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
