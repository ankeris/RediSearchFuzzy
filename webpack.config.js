const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (params) => {
    const isProduction = params && params.production;
    return {
        entry: "./src/index.ts",
        mode: isProduction ? "production" : "development",
        devtool: !isProduction && "inline-source-map",
        watch: !isProduction,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.(ts|tsx)$/,
                    enforce: "pre",
                    use: [
                        {
                            options: {
                                eslintPath: require.resolve("eslint"),
                            },
                            loader: require.resolve("eslint-loader"),
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            plugins: [new TsconfigPathsPlugin()],
        },
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "commonjs",
        },
    };
};
