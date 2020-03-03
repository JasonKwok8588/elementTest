module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                pathRewrite: {
                    '^/api': '',
                },
                target: "http://kumanxuan1.f3322.net:8084",
            }
        }
    }
}