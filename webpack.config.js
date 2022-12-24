const path = require('path')


//for crypto
module.exports = {
    resolve: {
        fallback: {
            crypto: require.resolve('crypto-browserify'),
        },
    },
}