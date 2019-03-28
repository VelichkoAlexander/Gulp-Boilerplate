const gulp = require('gulp'),
  del = require('del');
require('./sass');
require('./pug');
require('./js');
require('./fonts');
require('./img');
require('./libs');
require('./sprite-svg/sprite-svg');

gulp.task('clean', function (done) {
  del.sync([
    'dest/',
    '!dest/img',
    '!dest/img/**/*']);
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'sass',
  'pug',
  'js',
  'fonts',
  'img',
  'sprite:svg',
  'libs'
));
