// dependences list
const { src, dest, watch, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const browserSync = require('browser-sync');

// create function
function scss() {
  return src('./src/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
}

function html() {
  return src('./src/pug/**/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

function js() {
  return src('./src/assets/js/*.js')
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      ignoreFiles: ['*.min.js']
    }))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

// default task
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.watch = function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('./src/pug/**/*.pug', html).on('change', browserSync.reload);
  watch('./src/assets/scss/**/*.scss', scss).on('change', browserSync.reload);
  watch('./src/assets/js/*.js', js).on('change', browserSync.reload);
}