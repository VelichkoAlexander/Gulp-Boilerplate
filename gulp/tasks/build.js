const gulp                = require('gulp'),
      runSequence         = require('run-sequence'),
      del                 = require('del');


gulp.task('clean', function() {
    return del(['dist/'])
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
