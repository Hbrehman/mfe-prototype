const { merge } = require('webpack-merge') // merge two different webpack configs.
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', //output file names will use this template
        publicPath: '/app-catalog/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'catalog',
            filename: 'remoteEntry.js',
            exposes: {
                './CatalogApp': './src/bootstrap'
            },
            remotes: {
                container: `container@/container/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)
