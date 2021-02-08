const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude:[/node_modules/,/assets/]
            },
            {
                test:/\.vue$/,
                use: {
                    loader: 'vue-loader',
                },
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}
