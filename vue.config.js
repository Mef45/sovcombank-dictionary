module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.datamuse.com/',
                pathRewrite: { '^/api': '/' },
            },
        },
    },

    lintOnSave: false,
}
