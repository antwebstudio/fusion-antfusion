// webpack.mix.js

let mix = require('laravel-mix');
let path = require('path');

mix.js('resources/js/app.js', 'public/js').vue().setPublicPath('public')  
    .version()
    .webpackConfig({
        output: {
            publicPath: '/addons/AntFusion/',
            chunkFilename: "js/chunks/[name].js?id=[chunkhash]",
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../../fusioncms/cms/resources/js/'),
            },
        },
    });