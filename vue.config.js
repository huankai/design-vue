/*
 vue cli 配置，会与 webpack 中的配置合并
 */
module.exports = {
  // 当 publicPath 配置了 上下文后，如果使用的是 vue-router，也需要在 router/index.js 文件中 配置 base属性，值与这里的一样
  // 也可以使用 process.env.BASE_URL 来获取该值
  publicPath: "/vue",
  //  当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: "dist",
  assetsDir: "", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: "index.html", // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
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
        target: "http://127.0.0.1:7100",
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          "^/oauth2": "/oauth2"
        }
      },
      "/emi": {
        target: "http://127.0.0.1:6210",
        changeOrigin: true,
        pathRewrite: {
          "^/emi": "/emi"
        }
      },
      "/pms": {
        target: "http://127.0.0.1:6220",
        changeOrigin: true,
        pathRewrite: {
          "^/pms": "/pms"
        }
      },
      "/quartz": {
        target: "http://127.0.0.1:6230",
        changeOrigin: true,
        pathRewrite: {
          "^/quartz": "/quartz"
        }
      },
      "/fs": {
        target: "http://127.0.0.1:6240",
        changeOrigin: true,
        pathRewrite: {
          "^/fs": "/fs"
        }
      },
      "/api": {
        target: "http://127.0.0.1:7110",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }

  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: { // 给 less-loader 传递参数
        javascriptEnabled: true
      }
    }
  }
};
