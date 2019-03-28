const gulp = require('gulp');
require('./server');
require('./index/index-page');


gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'sass:watch',
    'js:watch',
    'pug:watch',
    'fonts:watch',
    'img:watch',
    'libs:watch',
    'sprite:svg:watch',
    'list-pages:watch'
  ),
  'list-pages',
  'server'
));
