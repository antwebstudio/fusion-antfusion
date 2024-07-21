// webpack.mix.js

let mix = require('laravel-mix');
let path = require('path');
let tailwindcss = require('tailwindcss')

mix.js('resources/js/app.js', 'public/js').vue().setPublicPath('public')  
    .version()
    .sass('resources/sass/app.scss', 'css')
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
    })
    .options({
        processCssUrls: false,
        postCss: [
         //    tailwindcss('./tailwind.config.js')
            tailwindcss('./resources/tailwind.js')
        ],
    });