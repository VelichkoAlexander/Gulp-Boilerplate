const gulp = require('gulp'),
  cnf = require('../gulpconfig').config,
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  pug = require('gulp-pug');

gulp.task('pug', function () {
  gulp.src(cnf.src.pug + '/pages/**/*.pug')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug({
      // locals: JSON.parse(fs.readFileSync(paths.YOUR_LOCALS, 'utf-8')),
      pretty: true
    }))
    .pipe(gulp.dest(cnf.dist.html))
    .pipe(global.browserSync.reload({stream: true}));
});

gulp.task('pug:watch', function () {
  gulp.watch('app/**/*.pug', ['pug']);
});


