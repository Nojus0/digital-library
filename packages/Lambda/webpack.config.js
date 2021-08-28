const path = require('path');
module.exports = {
    entry: {
        main: './index.ts'
    },
    mode: "production",
    target: "node",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    externals: path.resolve(__dirname, "node_modules"),
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'awesome-typescript-loader'
            }
        ]
    },
};