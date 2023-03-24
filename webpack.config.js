const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map", // eval error ('unsafe-eval')
  entry: {
    popup: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    filename: "index.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/content_scripts"),
          to: path.resolve(__dirname, "dist/content_scripts"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "ReactJS Fill Form Ext",
      filename: "index.html",
      chunks: ["popup"],
    }),
    new Dotenv({
      path: `./.env`,
    }),
  ],
};
