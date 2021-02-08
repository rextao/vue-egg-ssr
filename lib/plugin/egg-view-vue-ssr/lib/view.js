class View {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = this.app.config.vuessr;
  }

  render(name, locals, options = {}) {
    const context = { state: locals , ctx: this.ctx};
    return this.app.vue.render(name, context, options).then(html => {
      return html;
    }).catch(err => {
      if (this.config.fallbackToClient) {
        this.app.logger.error('[%s] server render bundle error, try client render, the server render error', name, err);
        return this.app.vue.renderClient(options.name, locals, options);
      }
      throw err;
    });
  }

  renderString(tpl, locals) {
    locals = this.app.vue.normalizeLocals(this.ctx, locals);
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;
