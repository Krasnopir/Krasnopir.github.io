const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PROJECT_DEPS = process.env.PROJECT_DEPS || __dirname;
const STATIC_HOST = "/static"

const cssLoaderOpts = JSON.stringify({
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]--[hash:base64:5]',
});

const postcssOptimize = require(path.resolve(__dirname, 'postcss.config.optimize.js'));
const postcssLoaderOpts = JSON.stringify({
    config: {
        path: 'postcss.config.js',
    }
});

const babelLoaderOpts = JSON.stringify({
    presets:['react', 'stage-2']
});


module.exports = {
    entry: {
        index: './dev/app.js',
    },
    output: {
        path: path.join(__dirname, "static"),
        pathinfo: true,
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: [`babel-loader?${babelLoaderOpts}`],
            },
            {
                test: /\.sss/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: [`css-loader?${cssLoaderOpts}`, `postcss-loader?${postcssLoaderOpts}`],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'images/[path][name].[ext]',
                        limit: 40000,
                    }
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            `${path.resolve(PROJECT_DEPS, 'node_modules')}`,
            'node_modules',
        ],
    },
    resolveLoader: {
        modules: [`${path.resolve(PROJECT_DEPS, 'node_modules')}`, 'node_modules']
    },
    plugins: [
        new ExtractTextPlugin(
            'css/[name].css',
            { allChunks: true }
        ),
        new OptimizeCssAssetsPlugin({
            cssProcessor: {
                process(css) {
                    return postcssOptimize(css);
                },
            }
        }),
    ],
    node: {
        fs: 'empty'
    },
    stats: {
        children: false
    },
};
