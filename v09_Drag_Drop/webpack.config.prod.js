const path = require('path');

// clean-webpack-plugin : helps us to clean up 'dis' folder whenever we rebuild our project
const cleanPlgin = require('clean-webpack-plugin');

module.exports = 
{
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // TS Source map helps us to debug our code and webpack supports it as well. We tell webpack to the generated TS source map.
    devtool: 'none',
    
    // Modules are applied per file level
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
    },

    // Plugins are applied to the whole level app
    plugins: [
        new cleanPlgin.CleanWebpackPlugin()
    ]
};