var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');

//Javascript
gulp.task('minify-js', function (cb) {
  pump([
        gulp.src('assets/app/js/*.js'),
        uglify(),
        gulp.dest('assets/js')
    ],
    cb
  );
});

//CSS
gulp.task('minify-css', function() {
  return gulp.src('assets/app/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));
});

//IMG
gulp.task('minify-img-jpg', function() {
    gulp.src('assets/app/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img'));
});

gulp.task('minify-img-png', function() {
    return gulp.src('assets/app/img/*.png')
		.pipe(optipng({ optimizationLevel: 3 })())
		.pipe(gulp.dest('assets/img'));
});

gulp.task('default', function () {
    //CSS 
    gulp.watch('assets/app/css/*.css', ['minify-css']);
    //JS
    gulp.watch('assets/app/js/*.js', ['minify-js']);
    //IMG
    gulp.watch('assets/app/img/*.jpg', ['minify-img-jpg']);
    gulp.watch('assets/app/img/*.png', ['minify-img-png']);

});