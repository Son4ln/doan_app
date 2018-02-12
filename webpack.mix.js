let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/jsx/manage/index.js', 'public/js/dashboard.js')
	.react('resources/assets/jsx/manage/login.js', 'public/js/login.js')
	.react('resources/assets/jsx/homepage/index.js', 'public/js/homepage.js')
   .sass('resources/assets/sass/dashboard.scss', 'public/css/dashboard.css')
   .sass('resources/assets/sass/login.scss', 'public/css/login.css')
   .sass('resources/assets/sass/homepage.scss', 'public/css/homepage.css');
