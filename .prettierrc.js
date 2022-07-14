module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    'application/initStores',
    '^react$|^react-native$',
    '^@scm(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^screens/(.*)|^application/(.*)|^shared/(.*)|^infrastructure/(.*)|^features/(.*)|^components/(.*)|^assets/(.*)',
    '^./|^../|^.$|storybook',
  ],
  importOrderSeparation: true,
};
