const path = require('path');
module.exports = {
    viewVueSsr: {
        enable: true,
        path: path.join(__dirname, '../lib/plugin/egg-view-vue-ssr'),
    }
};
