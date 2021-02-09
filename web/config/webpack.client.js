const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')

module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname,'../entry/entry-client.js'),
    optimization:{
        runtimeChunk:true
    },
    plugins: [
        new VueSSRClientPlugin()
    ]
})
