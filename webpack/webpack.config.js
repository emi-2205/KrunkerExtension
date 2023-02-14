const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {
        mode: "production",
        entry: {
            background: path.resolve(__dirname, "..", "src", "background.ts"),
            popup: path.resolve(__dirname, "..", "src", "popup", "app.tsx"),
            options: path.resolve(
                __dirname,
                "..",
                "src",
                "options",
                "options.ts"
            ),
        },
        output: {
            path: path.join(__dirname, "../dist"),
            filename: "[name].bundle.js",
            clean: true,
        },
        resolve: {
            extensions: [".tsx", ".jsx", ".ts", ".js", ".css", ".scss"],
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        // Creates `style` nodes from JS strings
                        // Fallback to style-loader in development
                        !env.production
                            ? "style-loader"
                            : MiniCssExtractPlugin.loader,

                        // Translates CSS into CommonJS
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                sourceMap: true,
                            },
                        },

                        // PostCSS
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                            },
                        },

                        // Compiles Sass to CSS
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: "compressed",
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: ".", to: ".", context: "public" }],
            }),
            // Generate popup page
            new HtmlWebpackPlugin({
                filename: "popup.html",
                template: "src/popup/index.html",
                chunks: ["popup"],
            }),
            // Generate options page
            new HtmlWebpackPlugin({
                filename: "options.html",
                template: "src/options/index.html",
                chunks: ["options"],
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            }),
        ],
    };
};
