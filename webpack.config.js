const HtmlMinifierPlugin = require('minify-html-webpack-plugin');
const path = require('path');

module.exports = {
    watch: true,
    entry: {
        popup: path.resolve(__dirname, 'src/popup.js'),
        background: path.resolve(__dirname, 'src/background.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.s[ac]ss$/,
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
                        fiber: require('fibers'),
                        includePaths: [path.resolve(__dirname, 'node_modules')],
                    },
                },
            }],
        }],
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.scss', '.js'],
    },
    plugins: [new HtmlMinifierPlugin({
        src: path.resolve(__dirname, 'src/'),
        dest: path.resolve(__dirname, 'build/'),
        ignoreFileNameRegex: /(\.s[ac]ss$|\.js$)/,
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