const HtmlMinifierPlugin = require('minify-html-webpack-plugin');
const path = require('path');
module.exports = {
    watch: true,
    mode: 'production',
    entry: path.resolve(__dirname, 'src/popup.js'),
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'popup.js',
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader',
                options: {
                    insert: 'head',
                    injectType: 'singletonStyleTag',
                },
            }, 'css-loader', {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                    sassOptions: {
                        fiber: require('fiber'),
                    },
                },
            }],
        }],
    },
    plugins: [new HtmlMinifierPlugin({
        src: path.resolve(__dirname, 'src/'),
        dest: path.resolve(__dirname, 'build/'),
        rules: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            html5: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributesQoutes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            useShortDoctype: true,
            trimCustomFragments: true,
        },
    })],
};