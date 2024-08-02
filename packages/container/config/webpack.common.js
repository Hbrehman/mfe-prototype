module.exports = {
    module: {
        rules: [
            // loader to tell webpack to process some files as we we start to improt them into project
            {
                //babel is going to process all code from es-6,7, etc and turn it into es5 code so it can be processed in web browser.
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
    }
}
