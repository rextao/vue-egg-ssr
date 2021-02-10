const webpackConfig = require('./../../../web/config/webpack.server.js');
const webpackClientConfig = require('./../../../web/config/webpack.client.js');
const webpack = require("webpack");
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS();
const compilerServer =webpack(webpackConfig);
const compilerClient =webpack(webpackClientConfig);
module.exports = app => {
    compilerServer.outputFileSystem = mfs;
    if (app.view) {
        app.view.resolve = function (name) {
            return Promise.resolve(name);
        };
    }
    if (app.vue) {
        const render = app.vue.render;
        app.vue.render = (name) => {
            const bundle = JSON.parse(mfs.readFileSync(name,'utf-8'))
            return render.bind(app.vue)(bundle);
        }
    }
    compilerServer.watch({},(err, stats) => {
        console.log('server bundle update')
    });
    compilerClient.watch({},(err, stats) => {
        console.log('client bundle update')
    });
}
