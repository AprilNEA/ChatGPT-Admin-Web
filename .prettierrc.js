module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  importOrder: ['^@(?!/).*$', '^@/(.*)$', 'shared', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy', 'jsx'],
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
};
