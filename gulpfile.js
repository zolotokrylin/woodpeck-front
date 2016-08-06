// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jade = require('gulp-jade'); // jade to html
var livereload = require('gulp-connect'); // livereload in chrome
var stylus = require('gulp-stylus'); // stylus to css
var concat = require('gulp-concat'); // merge files
var minifyCSS = require('gulp-clean-css'); // minify css
var uglify = require('gulp-uglify'); // minify css

// Jade Task
gulp.task('jade', function () {
    return gulp.src('./src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./build'))
        .pipe(livereload.reload());
});


// Comple Stylus to css
gulp.task('stylus', function () {
    return gulp.src('./src/stylus/*.styl')
        .pipe(stylus())
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css/'))
        .pipe(livereload.reload());

});

gulp.task('scripts', function () {
    return gulp.src([
    		'src/js/jquery.js',
    		'src/js/bootstrap.min.js',
    	])
        .pipe(concat('mine.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    livereload.server({
        livereload: true
    });

    gulp.watch('src/jade/**', ['jade']);
    gulp.watch('src/stylus/*.styl', ['stylus']);
});

// Default Task
gulp.task('default',
    [
        'stylus',
        'jade',
        'watch',
        'scripts'
    ]);
