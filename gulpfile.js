const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('sources/scss/*.scss')
     .pipe(sass())
     .pipe(gulp.dest('assets/css'))
     .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src('sources/js/*.js')
     .pipe(babel({
       presets: ['@babel/preset-env']
     }))
     .pipe(uglify())
     .pipe(gulp.dest('assets/js'))
     .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: "./"
  });
  
  gulp.watch('sources/scss/*.scss', gulp.series('sass'));
  gulp.watch('sources/js/*.js', gulp.series('js'));
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'js', 'serve'));