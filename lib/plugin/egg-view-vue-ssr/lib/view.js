class View {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = this.app.config.vuessr;
  }

  async render(name, locals, options = {}) {
    const context = { state: locals , ctx: this.ctx};
    try {
      return await this.app.vue.render(name, context, options);
    } catch (e) {
      return this.app.vue.renderClient(options.name, locals, options);
    }
  }

  renderString(tpl, locals) {
    locals = this.app.vue.normalizeLocals(this.ctx, locals);
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;
