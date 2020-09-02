const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/App.js',
    output: {
        filename: 'appBundle.js',
        path: path.resolve(__dirname, './src'),
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                options:{
                    compact:false
                }
            }
        ]
    },
};