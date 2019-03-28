const gulp = require('gulp');
consolidate = require('gulp-consolidate');
cnf = require('../../gulpconfig').config;
yaml = require('require-yaml');

gulp.task('list-pages', function (done) {
  delete require.cache[require.resolve('../../../' + cnf.src.pagelist)];
  const pages = require('../../../' + cnf.src.pagelist);
  gulp
    .src(__dirname + '/index.html')
    .pipe(consolidate('lodash', {
      pages: pages
    }))
    .pipe(gulp.dest('./dist/'));
  done();
});

gulp.task('list-pages:watch', function (done) {
  gulp.watch(cnf.src.pagelist, gulp.series('list-pages'));
  done();
});
