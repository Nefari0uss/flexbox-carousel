const path = require("path");  // Used to resolve directory paths.
const CleanWebpackPlugin = require("clean-webpack-plugin"); // Used to remove the 'dist' folder.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
    context: path.resolve(__dirname, "../"),
    /** Set the entry point for webpack. */
    entry: {
        index: "./src/js/index.js"
    },
    /** Set the output point for webpack. */
    output: {
        filename: "[name].js",
        pathinfo: true,
        sourceMapFilename: "dist/sourcemaps/[file].map",
    },
    resolve: {
        /** Allow importing of files without specifying relative paths. */
        alias: {
            node_modules: path.resolve(__dirname, "./node_modules"),
            src: path.resolve(__dirname, "./src/"),
            js: path.resolve(__dirname, "./src/js/"),
            html: path.resolve(__dirname, "./src/html/"),
            sass: path.resolve(__dirname, "./src/sass/"),
            img: path.resolve(__dirname, "./src/img/"),
            data: path.resolve(__dirname, "./src/data/"),
            converters: path.resolve(__dirname, "./src/js/converters/"),
            components: path.resolve(__dirname, "./src/js/components/"),
            models: path.resolve(__dirname, "./src/js/models/"),
        },
        /** Enable importing without including filetype extension. */
        extensions: [".js", ".json", ".scss", ".sass", ".css"]
    },
    mode: "development",
    devtool: "inline-source-map",
    module: {
        /** Apply the following rules in order. */
        rules: [
            /** Linting **/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    emitError: true,
                    failOnWarning: false,
                    failOnError: false
                }
            },
            /** Load images. */
            {
                test: /\.(png|jpg|gif)$/,
                use: "file-loader",
            },
            /** SASS to CSS **/
            /** TODO - add auto prefixer */
            {
                test: /\.scss$/,
                use: [
                    // processed in reverse order
                    { loader: "style-loader", }, // create style nodes from JS strings
                    { loader: "css-loader", }, // transpile the CSS into CommonJS
                    { loader: "sass-loader" }, // compiles Sass to CSS
                ]
            },
        ]
    },
    /** Show performance hints/warnings/errors to user via CLI. */
    //performance: { hints: "warning" },
    /** The environment WebPack should target. */
    target: "web",
    /** Show stats while building. */
    stats: "normal",
    /** Plugins should be configured here. */
    plugins: [
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/, // exlude node_modules folder
            failOnError: false // show a warning for circular dependicies
        }),
        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
        }),
        new CleanWebpackPlugin(["dist"]),
    ]
};
