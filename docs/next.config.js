const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  // i18n: {
  //   locales: ["en-US", "zh-CN"],
  //   defaultLocale: "en-US",
  // },
});
