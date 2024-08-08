const { merge } = require('webpack-merge') // merge two different webpack configs.
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8084/'
    },
    devServer: {
        port: 8084,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'competencies',
            filename: 'remoteEntry.js',
            exposes: {
                './CompetenciesApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig)

