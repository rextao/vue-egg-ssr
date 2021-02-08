module.exports = {
    // 根据egg view 插件的设计，实际，不需要定义ctx.render方法
    renderClient() {
        return this.app.vue.renderClient();
    },
    renderSsr(name) {
        return this.app.vue.render(name);
    }
};

