module.exports = {
    baseUrl: "/client",
    lintOnSave: false,
    devServer: {
        proxy: {
            '/client': {
                target: 'http://localhost:3000',
                // pathRewrite: {'^/client': ''}
            }
        }
    }
};