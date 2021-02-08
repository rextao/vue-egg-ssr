const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname,'../entry/entry-client.js'),
    output:{
        path:path.resolve(__dirname,'./../public'),
    },
    optimization:{
        runtimeChunk:true
    },
    devServer: {
        headers: {'Access-Control-Allow-Origin': '*'},
        contentBase: path.resolve(__dirname,'./../dist'),
    },
    plugins: [
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.csr.html',
            template:path.resolve(__dirname,'./index.template.html'),
        })
    ]
})
