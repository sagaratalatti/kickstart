const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const { resolver: { sourceExts, assetExts } } = defaultConfig;

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      sourceExts: [...sourceExts, 'cjs'],
      assetExts: [...assetExts],
      extraNodeModules: {
        ...require('node-libs-react-native'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
      },
    },
  };
})();
