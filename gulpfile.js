const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
/* const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); */
const browserSync = require('browser-sync').create();
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
//const rename = require('gulp-rename');

function browsersync() {
  browserSync.init({
    server: 'src/',
    notify: false,
  });
}

function buildSass() {
  return (
    src('src/styles/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', sass.logError)
      /* .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
        }),
        cssnano(),
      ])
    ) 
    .pipe(rename('styles.min.css'))*/
      //.pipe(dest('src/css'))
      .pipe(dest('dist/css'))
      .pipe(dest('src/css'))
      .pipe(sourcemaps.write('.'))
      .pipe(browserSync.stream())
  );
}

/* function buildJs() {
  return (
    src('src/js/main.js')
      .pipe(rename('scripts.min.js'))
      .pipe(dest('src/js'))
      .pipe(browserSync.stream())
  );
} */

function html() {
  return src('src/**/*.html').pipe(dest('dist/')).pipe(browserSync.stream());
}

function serve() {
  // watch('src/js/**/*.js', buildJs);
  watch('src/scss/**/*.scss', buildSass);
  watch('src/**/*.html', html);
}

function copy() {
  return src(['src/img/**/*.*', 'src/css/**/*.css'], {
    base: 'src/',
  }).pipe(dest('dist'));
}

function cleanDist() {
  return del('dist/**/*', { force: true });
}

exports.build = series(cleanDist, buildSass, /* buildJs, */ html, copy);
exports.default = series(
  [html, buildSass /* , buildJs */],
  parallel(browsersync, serve)
);
