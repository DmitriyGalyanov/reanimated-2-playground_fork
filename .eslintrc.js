module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: ['@react-native-community'],
  ignorePatterns: [
    '*.generated.*',
    'src/infrastructure/apollo-client/types.ts',
    'src/infrastructure/apollo-hasura-client/types.ts',
    'e2e/*',
  ],
  rules: {
    'react-native/no-inline-styles': 1,
    'react-hooks/exhaustive-deps': 2,
    'react/jsx-key': [1, { checkFragmentShorthand: true }],
    'react/jsx-curly-brace-presence': [
      1,
      { props: 'always', children: 'ignore' },
    ],
    'import/no-duplicates': 2,
    'no-console': 2,
    'no-shadow': [0, { hoist: 'never' }],
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
        prefix: ['T'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
        prefix: ['I'],
      },
    ],
  },
  overrides: [
    //https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts - source
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'constructor-super': 'off', // ts(2335) & ts(2377)
        'getter-return': 'off', // ts(2378)
        'no-const-assign': 'off', // ts(2588)
        'no-dupe-args': 'off', // ts(2300)
        'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
        'no-dupe-keys': 'off', // ts(1117)
        'no-func-assign': 'off', // ts(2539)
        'no-import-assign': 'off', // ts(2539) & ts(2540)
        'no-new-symbol': 'off', // ts(2588)
        'no-obj-calls': 'off', // ts(2349)
        'no-redeclare': 'off', // ts(2451)
        'no-setter-return': 'off', // ts(2408)
        'no-this-before-super': 'off', // ts(2376)
        'no-undef': 'off', // ts(2304)
        'no-unreachable': 'off', // ts(7027)
        'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
        'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
          },
        ], // ts provides better types with const
        'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
        'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
        'valid-typeof': 'off', // ts(2367)
      },
    },
  ],
};
