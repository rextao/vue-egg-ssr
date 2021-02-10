const {createBundleRenderer} = require('vue-server-renderer')
const path = require('path');
const fs = require('fs');
class Engine {
    constructor(app) {
        this.app = app;
        this.bundle = '';
        this.templatePath = './app/index.template.html';
    }
    // 利用了 devserver + HtmlWebpackPlugin
    async renderClient() {
        return this.readFile('index.csr.html','utf-8');
    }
    async render(name) {
        const clientManifest = await this.readFile('vue-ssr-client-manifest.json');
        const renderer = createBundleRenderer(name,{
            runInNewContext: false,
            template: fs.readFileSync('./app/index.template.html', 'utf-8'),
            clientManifest,
        })
        return await renderer.renderToString();
    }
    readFile(name) {
        const buildPath = path.join('./app/view',name)
        return JSON.parse(fs.readFileSync(buildPath,'utf-8'))
    }
}
module.exports = Engine;
