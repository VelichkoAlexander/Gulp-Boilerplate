const gulp        = require('gulp');
    consolidate = require('gulp-consolidate');
    cnf = require('../../gulpconfig').config;
    yaml        = require('require-yaml');

gulp.task('list-pages', function() {
	delete require.cache[require.resolve('../../../' + cnf.src.pagelist)];
  const pages = require('../../../' + cnf.src.pagelist);
  return gulp
    .src(__dirname + '/index.html')
    .pipe(consolidate('lodash', {
      pages: pages
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('list-pages:watch', function() {
  gulp.watch(config.src.pagelist, ['list-pages']);
});
