const gulp                = require('gulp'),
      runSequence         = require('run-sequence');


gulp.task('default', function() {
    runSequence(
        'build',
        [
            'sass:watch',
            'js:watch',
            'pug:watch',
            'fonts:watch',
            'img:watch',
            'libs:watch'
        ],
        'server'
    );
  });
