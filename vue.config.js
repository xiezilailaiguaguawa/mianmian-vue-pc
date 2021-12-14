module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1/heimamm/public',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}