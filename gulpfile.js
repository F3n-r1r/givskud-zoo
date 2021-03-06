const gulp      = require('gulp');
const babel     = require('gulp-babel');
const gutil     = require('gulp-util');
const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');
const prefix    = require('gulp-autoprefixer');
const sass      = require('gulp-sass');
const sourcemaps= require('gulp-sourcemaps');

var config = {
    babel: {
        presets: ["env"]
    },
    sass: {
        outputStyle: 'compressed'
    }
}
var input = {
    stylesheet: 'src/scss/default.scss',
    javascript: Array('src/js/*.js', 'src/js/**/*.js')
}
var output = {
    stylesheet: 'dest/',
    javascript: 'dest/'
}
var production = {
    stylesheet: 'production/',
    javascript: 'production/'
}
var watch = {
    stylesheet: Array('src/scss/default.scss', 'src/scss/**/*.scss'),
    javascript: Array('src/js/*.js', 'src/js/**/*.js')
}

gulp.task('default', ['watch']);
gulp.task('stylesheet', function(){
    return gulp.src(input.stylesheet)
        .pipe(gutil.env.type !== 'production' ? sourcemaps.init() : gutil.noop())
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(prefix())
        .pipe(gutil.env.type !== 'production' ? sourcemaps.write() : gutil.noop())
        .pipe(gutil.env.type !== 'production' ? gulp.dest(output.stylesheet) : gulp.dest(production.stylesheet));
});
gulp.task('javascript', function(){
    return gulp.src(input.javascript)
        .pipe(gutil.env.type !== 'production' ? sourcemaps.init() : gutil.noop())
        .pipe(concat('application.js'))
        .pipe(babel(config.babel))
        .pipe(gutil.env.type !== 'production' ? gutil.noop() : uglify())
        .pipe(gutil.env.type !== 'production' ? sourcemaps.write() : gutil.noop())
        .pipe(gutil.env.type !== 'production' ? gulp.dest(output.javascript) : gulp.dest(production.javascript));
});
gulp.task('watch', ['javascript', 'stylesheet'], function(){
    gulp.watch(watch.javascript, ['javascript']);
    gulp.watch(watch.stylesheet, ['stylesheet']);
});