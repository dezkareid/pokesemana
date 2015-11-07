var gulp      = require('gulp'),
  connect     = require('gulp-connect'),
  concat      = require('gulp-concat-util'),
  concatCss   = require('gulp-concat-css'),
  jade        = require('gulp-jade'),
  gutil       = require('gulp-util'),
  gulpif      = require('gulp-if');


gulp.task('connect', function () {
  connect.server({
    root: 'build',
    port: 8888,
    livereload: true                                                                                                                                                                                                                           
  });
});

gulp.task('jade', function () {
  return gulp.src(['app/**/*.html', 'app/**/*.jade'])
    .pipe(gulpif(/[.]jade$/, jade({
      pretty: true
    })))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  return gulp.src(["bower_components/**/dist/**/*.min.css", "app/assets/styles/**/*.css"])
      .pipe(concatCss('app.min.css'))
      .pipe(gulp.dest('build/assets/css/'))
});

gulp.task('js', function() {
  return gulp.src(["bower_components/**/dist/*.min.js", "app/assets/js/**/*.js"])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/assets/js/'))
    .pipe(connect.reload())
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/assets/**/*.js'], ['js']);
  gulp.watch(['./app/assets/styles/**/*.css'],['css']);
  gulp.watch(['./app/**/*.jade'], ['jade']);
});

gulp.task('default', ['connect', 'jade','css', 'js','watch']);
