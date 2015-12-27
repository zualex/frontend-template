var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var paths = {
	sprite_src: './src/sprite/*',
	sprite_imgName: 'sprite.png',
	sprite_fileName: '_sprite.scss',
	sprite_imgPath: '../sprite/sprite.png',
	sprite_resImg: './dist/sprite/',
	sprite_resFile: './src/sass/utils/',
	
	sass_src: './src/sass/*.scss',
	sass_watch: ['./src/sass/*', './src/sass/*/*'],
	sass_res: './dist/css',
	
	css_src: ['./dist/css/*.css', '!./dist/css/*.min.css'],
	css_res: './dist/css',
	
	js_src: ['./src/js/jquery/*.js', './src/js/vendors/*.js', './src/js/*.js'],
	js_folder: './dist/js',
	js_name: 'app.js',
	js_min_name: 'app.min.js',
};


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
    spriteData.css.pipe(gulp.dest(paths.sprite_resFile)); 
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
		.pipe(gulp.dest(paths.sass_res))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename({
            suffix: '.min'
        }))
		.pipe(gulp.dest(paths.css_res));
});



/*
* js
*/
gulp.task('js', function() {
	gulp.src(paths.js_src)
		.pipe(concat(paths.js_name))
		.pipe(gulp.dest(paths.js_folder));
});



/*
* minify-js
*/
gulp.task('minify-js', function() {
	gulp.src(paths.js_src)
		.pipe(concat(paths.js_min_name))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js_folder));
});


/*
* watch
*/
gulp.task('watch', function() {
	gulp.watch(paths.sass_watch, ['sprite', 'sass']);
	gulp.watch(paths.js_src, ['js', 'minify-js']);
});



/*
* default
*/
gulp.task('default', function() { 
	gulp.run('sprite', 'sass', 'js', 'minify-js');
});