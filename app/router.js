const {createBundleRenderer} = require('vue-server-renderer')
const webpackConfig = require('./../web/config/webpack.base.config.js');
const path = require('path');
const fs = require('fs');

function renderToString(context,renderer) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}
function readFile(name) {
  const buildPath = path.join(
      webpackConfig.output.path,
      name
  )
  return JSON.parse(fs.readFileSync(buildPath,'utf-8'))
}

module.exports = app => {
  const { router } = app;
  router.get('/', async (ctx) => {
    const bundle = readFile('vue-ssr-server-bundle.json');
    const clientManifest = readFile('vue-ssr-client-manifest.json');
    const renderer = createBundleRenderer(bundle,{
      runInNewContext: false,
      template: fs.readFileSync('./app/index.template.html', 'utf-8'),
      clientManifest,
    })
    ctx.body = await renderToString(ctx,renderer);
  });
};

