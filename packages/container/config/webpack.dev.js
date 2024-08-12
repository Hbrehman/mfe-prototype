const { merge } = require('webpack-merge') // merge two different webpack configs.
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            filename: 'remoteEntry.js',
            remotes: {
                feedback: 'feedback@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
                competencies: 'competencies@http://localhost:8084/remoteEntry.js',
            },
            exposes: {
                './ContainerApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig)
