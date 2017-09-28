var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel');


gulp.task('default', ['watch', 'main']);

gulp.task('main', function(){
    return gulp.src('./src/main.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets:['env']}))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    return gulp
        .watch('./src/**/*.js', ['main']);
});