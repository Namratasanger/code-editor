const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "process/browser": require.resolve("process/browser"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
  };

  config.resolve.extensions = [
    ...config.resolve.extensions,
    ".ts",
    ".js",
    ".tsx",
  ];

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];
  return config;
};
