const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
    minimize: false,
    minimizer: [],
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
    config.minimize = true;
  }

  return config;
};

const filename = (extensions) =>
  isDev ? `[name].${extensions}` : `[name].[hash].${extensions}`;

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./js/index.js",
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  devServer: {
    port: 8080,
    watchFiles: ["src/index.html"],
  },
  devtool: isDev ? "source-map" : "inline-source-map",
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/img"),
          to: path.resolve(__dirname, "dist/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
    new ESLintPlugin({
      extensions: ["js"],
      fix:true
      
     
    }),
  ],
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|jfif)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
