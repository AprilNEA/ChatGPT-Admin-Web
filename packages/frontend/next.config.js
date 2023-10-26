const fs = require("fs");
const yaml = require("js-yaml");

const config = yaml.load(fs.readFileSync("../../config.yaml", "utf8"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_TITLE: config?.site?.title ?? "ChatGPT-Admin-Web",
    NEXT_PUBLIC_OA: config?.site?.oa ?? "",
    NEXT_PUBLIC_BASE_URL: config?.url?.backend ?? "http://localhost:3001",
    NEXT_PUBLIC_WECHAT_MP_APP_ID: config?.wechat?.mp?.appId,
    NEXT_PUBLIC_WECHAT_OAUTH_APP_ID: config?.wechat?.oauth?.appId,
    NEXT_PUBLIC_WECHAT_OAUTH_REDIRECT_URL: config?.wechat?.oauth?.redirectUrl,
  },
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    }); // 针对 SVG 的处理规则

    return config;
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
