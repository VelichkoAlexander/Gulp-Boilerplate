const gulp                = require('gulp'),
      runSequence         = require('run-sequence'),
      del                 = require('del');


gulp.task('clean', function() {
    return del.sync([
      'dest/',
      '!dest/img',
      '!dest/img/**/*'])
});

gulp.task('build', ['clean'], function() {
    runSequence(
        'sass',
        'pug',
        'js',
        'fonts',
        'img',
        'libs'
    );
  });
