var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel');


gulp.task('default', function(){
    return gulp.src('./src/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel(presets:['env']))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});