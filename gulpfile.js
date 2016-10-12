const config = require("./config.json");

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const spritesmith = require('gulp.spritesmith');
const postcss = require('gulp-postcss');
const flexibility = require('postcss-flexibility');
const twig = require('gulp-twig');

/**
 * Gulp Taks
 */

gulp.task('start', function() {
  browserSync.init(config.browserSync);
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('build:sprites', function () {
  var spriteData = gulp.src(config.paths.sprites.src)
    .pipe(spritesmith({
      imgName: config.paths.sprites.imgName,
      cssName: config.paths.sprites.cssName,
      imgPath : config.paths.sprites.imgPath,
      cssFormat: 'scss',
      algorithm: 'top-down',
      padding: 40
    }));
  spriteData.img.pipe(gulp.dest(config.paths.sprites.dist));
  return spriteData.css.pipe(gulp.dest(config.paths.sprites.utils));
});

gulp.task('build:css', ['build:sprites'], function(){
  return gulp.src([config.paths.styles.src])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(postcss([flexibility]))
    .pipe(gulp.dest(config.paths.styles.dist))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.paths.styles.dist))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build:js', function(){
  return gulp.src([
    config.paths.scripts.srcFirstLoad,
    config.paths.scripts.srcVendor,
    config.paths.scripts.src,
  ])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.paths.scripts.dist))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.scripts.dist))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build:html', function () {
  return gulp.src(config.paths.html.src)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(twig())
    .pipe(gulp.dest(config.paths.html.dist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile', [
  'build:css',
  'build:js',
  'build:html'
]);

gulp.task('default', ['start'], function(){
  gulp.watch(config.paths.styles.src, ['build:css']);
  gulp.watch(config.paths.scripts.src, ['build:js']);
  gulp.watch(config.paths.html.watch, ['build:html']);
});
