const path = require('path');
const { VueLoaderPlugin } = require('vue-loader') // https://vue-loader.vuejs.org/
const HtmlWebPackPlugin = require('html-webpack-plugin'); // https://webpack.js.org/plugins/html-webpack-plugin/
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: './src/main.js',

    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',

            },
            {
                test: /\.css$/i,
                // include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },

        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            title: 'derustPy',
            template: 'public/index.html'
        }),
    ]
}
