/*
 vue cli 配置，会与 webpack 中的配置合并
 */
module.exports = {
  // 当 publicPath 配置了 上下文后，如果使用的是 vue-router，也需要在 router/index.js 文件中 配置 base属性，值与这里的一样
  // publicPath: "/vue",
  devServer: {
    // 配置项目启动后自动打开浏览器
    open: true,
    // 配置使用的端口号，默认为 8080
    port: 8888,
    // 配置是否使用 https，默认为false
    https: false,
    /*
        配置代理
     */
    proxy: {
      "/oauth2": {
        target: "http://localhost:7100",
        changeOrigin: true,
        pathRewrite: {
          "^/oauth2": "/oauth2"
        }
      },
      "/emi": {
        target: "http://127.0.0.1:7120",
        changeOrigin: true,
        pathRewrite: {
          "^/emi": "/emi"
        }
      },
      "/quartz": {
        target: "http://127.0.0.1:8889",
        changeOrigin: true,
        pathRewrite: {
          "^/quartz": "/quartz"
        }
      },
      "/api": {
        target: "http://localhost:7110",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }

  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
};
