const { merge } = require('webpack-merge') // merge two different webpack configs.
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', //output file names will use this template
        publicPath: '/feedback/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'feedback',
            filename: 'remoteEntry.js',
            remotes: {
                competencies: `competencies@/competencies/latest/remoteEntry.js`,
            },
            exposes: {
                './FeedbackApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)
