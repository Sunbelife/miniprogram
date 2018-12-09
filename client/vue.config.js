module.exports = {
    // baseUrl: "/td",
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