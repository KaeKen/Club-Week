var gulp 		 = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug			 = require('gulp-pug');

gulp.task('serve', ['sass', 'pug'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("*.sass", ['sass']);
    gulp.watch("*.pug", ['pug']);
});

gulp.task('sass', function() {
    return gulp.src("*.sass")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
        	browsers: ['last 3 version'],
        	cascade: false
        }))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function buildHTML(){
	return gulp.src('*.pug')
		.pipe(pug())
		.pipe(gulp.dest("./"))
		.pipe(browserSync.stream());
})

gulp.task('default', ['serve']);