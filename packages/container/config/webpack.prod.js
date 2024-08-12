const { merge } = require('webpack-merge') // merge two different webpack configs.
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            filename: 'remoteEntry.js',
            remotes: {
                feedback: `feedback@${domain}/feedback/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
                competencies: `competencies@${domain}/competencies/latest/remoteEntry.js`,
            },
            exposes: {
                './ContainerApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)
