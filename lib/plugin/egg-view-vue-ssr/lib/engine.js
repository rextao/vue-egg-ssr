const webpack =require('webpack');
const webpackConfig = require('./../../../../web/config/webpack.server.js');
const compiler =webpack(webpackConfig);
const {createBundleRenderer,createRenderer} = require('vue-server-renderer')
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS();
const path = require('path');
const Vue = require('vue');
const fs = require('fs');
class Engine {
    constructor(app) {
        this.app = app;
        this.bundle = '';
        this.watchComplier = null;
        this.templatePath = './app/index.template.html';
    }
    // 利用了 devserver + HtmlWebpackPlugin
    async renderClient() {
        console.log('name');
        // 使用客户端渲染，本地开发模式，只需用dev-server
        // this.watchComplier.close();
        // return csrTemplate.data;
    }
    async render(name) {
        const template =  fs.readFileSync(this.templatePath, 'utf-8');
        const mainFile =  fs.readFileSync('./app/view/main.js', 'utf-8');
        const renderer = createBundleRenderer(mainFile);
        return await renderer.renderToString();
        // if (!this.bundle ) {
        //     return '等待webpack打包完成后在访问在访问';
        // }
        // const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json');
        // const clientManifest = clientManifestResp.data;
        // const renderer = createBundleRenderer(this.bundle,{
        //     runInNewContext: false,
        //     template: require('fs').readFileSync(this.templatePath, 'utf-8'),
        //     clientManifest,
        // })
        // return await this.renderToString(ctx, renderer);
    }
    renderToString(context,renderer) {
        return new Promise((resolve, reject) => {
            renderer.renderToString(context, (err, html) => {
                err ? reject(err) : resolve(html);
            });
        });
    }
}
module.exports = Engine;
