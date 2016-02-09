var path = require('path');

module.exports = {
    entry: './js/search.js',
    output: {
        path: path.resolve('build'),
        filename: 'search.bundle.js',
        pathinfo: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: require.resolve('./js/search'),
                loaders: ["expose?reactSearch", "babel-loader?presets[]=react,presets[]=es2015"]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};