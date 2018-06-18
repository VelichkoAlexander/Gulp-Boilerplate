const gulp = require('gulp'),
  cnf = require('../gulpconfig').config;

gulp.task('fonts', function () {
  gulp.src(cnf.src.fonts)
    .pipe(gulp.dest(cnf.dest.fonts));
});

gulp.task('fonts:watch', function () {
  const fontWatcher = gulp.watch(cnf.src.fonts, ['fonts']);
  fontWatcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  
});
