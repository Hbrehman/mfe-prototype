
const HtmlWebpackPlugin = require('html-webpack-plugin') // take html file from our project and will inject script tags into it.

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'], // process all jsx tags, es-6,7 etc to ex-5
                        plugins: ['@babel/plugin-transform-runtime'] // add new features in browser like async/await etc
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
