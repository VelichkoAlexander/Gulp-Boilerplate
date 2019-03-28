const gulp = require('gulp'),
  cnf = require('../gulpconfig').config;

gulp.task('fonts', function (done) {
  gulp.src(cnf.src.fonts)
    .pipe(gulp.dest(cnf.dest.fonts));
  done();
});

gulp.task('fonts:watch', function (done) {
  const fontWatcher = gulp.watch(cnf.src.fonts, gulp.series('fonts'));
  fontWatcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  done();
});
