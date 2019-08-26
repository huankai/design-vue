/*
 vue cli 配置，会与 webpack 中的配置合并
 */
module.exports = {
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
