const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    /*
        Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process 
        other types of files and convert them into valid modules that can be consumed by your application 
        and added to the dependency graph.
    */
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i, 
                use: [ 
                    {
                        loader: 'file-loader' 
                    }
                ]
            },
            {
                test: /\.vue$/, //identifies which file or files should be transformed.
                use: 'vue-loader' // indicates which loader should be used to do the transforming.
                /*"Hey webpack compiler, when you come across a path that resolves to a '.vue' file inside of 
                a require()/import statement, use the vue-loader to transform it before you add it to the bundle."*/
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader',]
            },
            {
                //babel is going to process all code from es-6,7, etc and turn it into es5 code so it can be processed in web browser.
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // process all jsx tags, es-6,7 etc to ex-5
                        plugins: ['@babel/plugin-transform-runtime'] // add new features in browser like async/await etc
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
