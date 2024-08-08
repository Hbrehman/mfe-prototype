const { merge } = require('webpack-merge') // merge two different webpack configs.
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8081/'
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'feedback',
            filename: 'remoteEntry.js',
            remotes: {
                competencies: 'competencies@http://localhost:8084/remoteEntry.js'
            },
            exposes: {
                './FeedbackApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig)

