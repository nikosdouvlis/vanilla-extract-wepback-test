const path = require("path");
const webpack = require("webpack");
const packageJSON = require("./package.json");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const showAnalyzer = !!env.analyzer;
  const isProduction = !!env.production;
  const definePlugin = new webpack.DefinePlugin({
    __DEV__: !isProduction,
    __VERSION__: JSON.stringify(packageJSON.version),
  });
  const analyzerPlugin = showAnalyzer && new BundleAnalyzerPlugin({ openAnalyzer: true });

  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? undefined : "inline-source-map",
    plugins: [
      definePlugin,
      analyzerPlugin,
      new VanillaExtractPlugin({
        outputCss: true,
      }),
      new HtmlWebpackPlugin(),
    ].filter((s) => !!s),
    entry: "./src/index.ts",
    devServer: {
      static: "./dist",
      compress: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.vanilla\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                insert: (styles) => {
                  const target = document.head;
                  target.prepend(styles);
                },
              },
            },
            "css-loader",
          ],
        },
        {
          test: /\.css$/i,
          exclude: /(\.vanilla\.css$|node_modules)/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
      ],
    },
  };
};
