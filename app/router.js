module.exports = app => {
  const { router } = app;
  router.get('/csr', async (ctx) => {
    ctx.body = await ctx.renderClient();
  });
  router.get('/ssr', async (ctx) => {
    await ctx.render('vue-ssr-server-bundle.json');
  });
};

