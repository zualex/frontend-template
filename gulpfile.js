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
 * Paths to project folders
 */

const paths = {
  html: {
    src: 'app/src/twig/*.twig',
    watch: 'app/src/twig/**/*.twig',
    dist: 'app/view/'
  },
  sprites: {
    src: 'app/src/sprites/*',
    dist: 'app/dist/sprites/',
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../sprites/sprite.png',
    utils: 'app/src/styles/utils/'
  },
  styles: {
    src: 'app/src/styles/**/*.{scss,sass}',
    dist: 'app/dist/css/'
  },
  scripts: {
    srcFirstLoad: 'app/src/scripts/first-load/*.js',
    srcVendor: 'app/src/scripts/vendors/*.js',
    src: 'app/src/scripts/*.js',
    dist: 'app/dist/js/',
  }
};

/**
 * Gulp Taks
 */

gulp.task('start', function() {
  browserSync.init({
    proxy: config.proxy
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('build:sprites', function () {
  var spriteData = gulp.src(paths.sprites.src)
    .pipe(spritesmith({
      imgName: paths.sprites.imgName,
      cssName: paths.sprites.cssName,
      imgPath : paths.sprites.imgPath,
      cssFormat: 'scss',
      algorithm: 'top-down',
      padding: 40
    }));
  spriteData.img.pipe(gulp.dest(paths.sprites.dist));
  return spriteData.css.pipe(gulp.dest(paths.sprites.utils));
});

gulp.task('build:css', ['build:sprites'], function(){
  return gulp.src([paths.styles.src])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(postcss([flexibility]))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build:js', function(){
  return gulp.src([
    paths.scripts.srcFirstLoad,
    paths.scripts.srcVendor,
    paths.scripts.src,
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
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build:html', function () {
  return gulp.src(paths.html.src)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(twig())
    .pipe(gulp.dest(paths.html.dist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile', [
  'build:css',
  'build:js',
  'build:html'
]);

gulp.task('default', ['start'], function(){
  gulp.watch(paths.styles.src, ['build:css']);
  gulp.watch(paths.scripts.src, ['build:js']);
  gulp.watch(paths.html.watch, ['build:html']);
});
