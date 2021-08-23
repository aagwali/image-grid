const path = require("path")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = (_env, options) => {
  return {
    mode: options.mode,
    devServer: {
      port: "3000",
      historyApiFallback: true, // needed for react routing
    },
    output: {
      publicPath: "/", // needed for react routing
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
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
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new Dotenv({ safe: true }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: "css/app.min.css" }),
      new CopyPlugin({
        patterns: [{ from: "./src/application/assets/images", to: "images" }],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true,
        minify: false,
      }),
    ],
  }
}
