const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mp.weixin.qq.com",
        port: "",
        pathname: "/cgi-bin/showqrcode/**",
      },
    ],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    }); /* Processing rules for SVG */
    if (isServer) config.plugins = [...config.plugins, new PrismaPlugin()];
    return config;
  },
};

module.exports = nextConfig;
