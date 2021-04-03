const path = require('path');

module.exports = 
{
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),

        // This is the additional configuration needed for 'webpack-dev-server' (like lite-server) to really understand the output
        // is written to you and where does is it relative to index.html file.
        publicPath: 'dist'
    },

    // TS Source map helps us to debug our code and webpack supports it as well. We tell webpack to the generated TS source map.
    devtool: 'inline-source-map',
    
    module: {
        rules: [
        {
            // Wanna a check file that ends with .ts
            test: /\.ts$/,

            // What should we do with these TS files ? We handle them to TS loader and it knows what to do.
            use: 'ts-loader',
            exclude: /node_modules/
        }
        ]
    },

    // We tell webpack which file extension(s) it adds to the inputs it finds. By default it looks for a JS file.
    resolve: {
        extensions: ['.ts', '.js']
    }
};