const path = require("path")
const Dotenv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { outputConfig, copyPluginPatterns, entryConfig, devServer } = require("./webpack.env.config")

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: entryConfig,
    devServer,
    // Dev only
    // Target must be set to web for hmr to work with .browserlist
    // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    target: "web",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            // We're in dev and want HMR, SCSS is handled in JS
            // In production, we want our css as files
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "javascript/auto",
          loader: "file-loader",
          options: {
            publicPath: "../",
            name: "[path][name].[ext]",
            context: path.resolve(__dirname, "src/application/assets"),
            emitFile: false,
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: "javascript/auto",
          exclude: /images/,
          loader: "file-loader",
          options: {
            publicPath: "../",
            context: path.resolve(__dirname, "src/application/assets"),
            name: "[path][name].[ext]",
            emitFile: false,
          },
        },
      ],
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, outputConfig.destPath),
      publicPath: "",
    },
    plugins: [
      new Dotenv({ safe: true }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true,
        minify: false,
      }),
      new CopyPlugin(copyPluginPatterns),
    ],
  }
}
