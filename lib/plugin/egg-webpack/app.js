const webpackConfig = require('./../../../web/config/webpack.server.js');
const webpack = require("webpack");
const MemoryFS = require('memory-fs')
const axios = require('axios');
const mfs = new MemoryFS();
const compilerServer =webpack(webpackConfig);
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
        app.vue.readFile = async (name) => {
            const clientManifestResp = await axios.get(`http://localhost:8080/${name}`);
            const clientManifest = clientManifestResp.data;
            return clientManifest
        }
    }
    compilerServer.watch({},(err, stats) => {
        console.log('server bundle update')
    });
}
