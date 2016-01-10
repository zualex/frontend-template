var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var browserSync = require('browser-sync').create();



var pathDist = './dist';
var pathSrc = './src';

var paths = {
	bower: pathDist + '/vendor',

	sprite_src: pathSrc + '/sprite/*',
	sprite_imgName: 'sprite.png',
	sprite_fileName: '_sprite.scss',
	sprite_imgPath: '../sprite/sprite.png',
	sprite_resImg:  pathDist + '/sprite/',
	sprite_resFile: pathSrc + '/sass/utils/',
	
	sass_src: pathSrc + '/sass/*.scss',
	sass_res: pathDist + '/sass',
	
	css_src: [pathDist + '/vendor/all.css', pathDist + '/sass/*.css'],
	css_folder: pathDist + '/css',
	css_name: 'style.css',
	css_min_name: 'style.min.css',
	
	js_src: [pathDist + '/vendor/all.js', pathSrc + '/js/*.js'],
	js_folder: pathDist + '/js',
	js_name: 'app.js',
	js_min_name: 'app.min.js',
	
	css_watch: [pathSrc + '/sass/*', pathSrc + '/sass/*/*', '!'+pathSrc + '/sass/utils/_sprite.scss'],
	js_watch: [pathSrc + '/js/*.js'],
};



/*
* bower
*/
gulp.task('bower', function () {
	var filterJS = gulpFilter('**/*.js', { restore: true });
	var filterCSS = gulpFilter('**/*.css', { restore: true });
	
	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(filterJS)
		.pipe(concat('all.js'))
		.pipe(filterJS.restore)
		.pipe(filterCSS)
		.pipe(concat('all.css'))
		.pipe(filterCSS.restore)
		.pipe(gulp.dest(paths.bower)); 
});



/*
* sprite
*/
gulp.task('sprite', function () {
	 var spriteData = gulp.src(paths.sprite_src)
		.pipe(spritesmith({
			imgName: paths.sprite_imgName,
			cssName: paths.sprite_fileName,
			imgPath : paths.sprite_imgPath,
			cssFormat: 'scss',
			algorithm: 'top-down',
			padding: 40
		}));
	spriteData.img.pipe(gulp.dest(paths.sprite_resImg));
    return spriteData.css.pipe(gulp.dest(paths.sprite_resFile)); 
});



/*
* sass - эта задача не запустится пока задача sprite не закончит работу!
*/
gulp.task('sass', ['sprite'], function () {
	return gulp.src(paths.sass_src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.sass_res));
});



/*
* css - эта задача не запустится пока задачи sass и bower не закончит работу!
*/
gulp.task('css', ['sass', 'bower'], function() {
	return gulp.src(paths.css_src)
		.pipe(concat(paths.css_name))
		.pipe(gulp.dest(paths.css_folder))
		.pipe(concat(paths.css_min_name))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.css_folder))
		.pipe(browserSync.stream());
});



/*
* js
*/
gulp.task('js', function() {
	gulp.src(paths.js_src)
		.pipe(concat(paths.js_name))
		.pipe(gulp.dest(paths.js_folder))
		.pipe(concat(paths.js_min_name))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js_folder))
		.pipe(browserSync.stream());
});



/*
* watch
*/
gulp.task('watch', function() {
	gulp.watch(paths.css_watch, ['css']);
	gulp.watch(paths.js_watch, ['js']);
});



/*
* default
*/
gulp.task('default', function() { 
	gulp.run('css', 'js');
});



gulp.task('serve', function() {

    browserSync.init({
		server: {
            baseDir: "./"
        }
    });
	
	gulp.watch(paths.css_watch, ['css']);
	gulp.watch(paths.js_watch, ['js']);
	gulp.watch("*.html").on('change', browserSync.reload);
});