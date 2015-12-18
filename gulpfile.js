var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');


var paths = {
	sprite_src: './build/img-sprites/*',
	sprite_img: 'sprite.png',
	sprite_file: '../../build/sass/utils/_sprite.scss',
	sprite_res: './src/img-sprites/',
	
	sass_src: './build/sass/*.scss',
	sass_watch: ['./build/sass/*', './build/sass/*/*'],
	sass_res: './src/css',
	
	js_src: ['./build/js/jquery/*.js', './build/js/vendors/*.js', './build/js/*.js'],
	js_folder: './src/js',
	js_name: 'app.js',
};


/*
* sprite
*/
gulp.task('sprite', function () {
	gulp.src(paths.sprite_src)
		.pipe(spritesmith({
			imgName: paths.sprite_img,
			cssName: paths.sprite_file,
			cssFormat: 'scss',
			algorithm: 'top-down',
			padding: 40
		}))
		.pipe(gulp.dest(paths.sprite_res));
});



/*
* sass
*/
gulp.task('sass', function () {
	gulp.src(paths.sass_src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.sass_res));
});



/*
* js
*/
gulp.task('js', function() {
	gulp.src(paths.js_src)
		.pipe(concat(paths.js_name))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js_folder));
});


/*
* watch
*/
gulp.task('watch', function() {
	gulp.watch(paths.sass_watch, ['sprite', 'sass']);
	gulp.watch(paths.js_src, ['js']);
});



/*
* default
*/
gulp.task('default', function() { 
	gulp.run('sprite', 'sass', 'js');
});