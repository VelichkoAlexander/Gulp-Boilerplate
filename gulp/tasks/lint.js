const gulp        = require('gulp'),
     htmlhint    = require('gulp-htmlhint'),
     // sassLint    = require('gulp-sass-lint'),
      cnf = require("../gulpconfig").config;

gulp.task('lint:html', function() {
  return gulp.src(cnf.dest.html + "/*.html")
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('lint:sass', function() {
  return gulp.src(cnf.src.sass + '/*.{sass,scss}')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('lint', gulp.series('lint:sass','lint:html', (done)=> {
  done();
}));
