# base-ssr 分支基础项目
1. 在根目录下，npm run dev 启动egg服务
2. 在web/ 目录下 npm run dev-client 启动devserver服务

备注
1. 可以执行web/ 下的build-server 和build-client 生成实际的xxxxxx.json 文件

# egg-ssr 使用egg插件实现，并增加csr
1. 熟悉下egg插件
2. 实现csr，利用html-webpack-plugin，在`webpack.client.js`中配置插件
    ```javascript
        new HtmlWebpackPlugin({
            filename: 'index.csr.html',
            template:path.resolve(__dirname,'./index.template.html'),
        })
    ```
1. 对应文件会生成在/dist 文件夹下，由于本例是本地开发环境，故直接通过`const csrTemplate = await axios.get('http://localhost:8080/index.csr.html');`拿到csr渲染


备注
1. 默认情况下egg不支持ts，故plugin.ts可能不报错，但实际找不到context扩展的方法
1. 由于server版本是通过`webpack.watch`来触发重新编译的，故可以通过 close 方法调用关闭文件监听

# vue-view-ssr插件，利用bundleJs，实现csr与ssr
1. 上面存在问题是product环境，肯定不能用devServer搞
1. 参照：https://ssr.vuejs.org/zh/guide/#%E5%AE%8C%E6%95%B4%E5%AE%9E%E4%BE%8B%E4%BB%A3%E7%A0%81


备注
1. webpack不使用vue ssr 插件，则不会生成*.json文件
1. ssr需要打包两份js，server版本和web版本；使用插件由于会生成不同名的json文件，故可以将webpack输入都配置在dist
1. view 模板固定规则，会在app/view读取文件，要在插件app写引入插件的代码
    ```javascript
        module.exports = app => {
          app.view.use('vue', require('./lib/view'));
        };
    ```



# 使用egg代替devserver
