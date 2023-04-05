module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        useBuiltIns: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};
