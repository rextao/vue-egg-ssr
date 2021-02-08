module.exports = app => {
  const { router } = app;
  router.get('/csr', async (ctx) => {
    ctx.body = await ctx.renderClient('/web/public/main.js');
  });
  router.get('/ssr', async (ctx) => {
    ctx.body = await ctx.renderSsr('main.js');
  });
};

