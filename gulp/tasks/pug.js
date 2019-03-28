const gulp = require('gulp'),
  cnf = require('../gulpconfig').config,
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  frontMatter = require('gulp-front-matter'),
  changed     = require('gulp-changed'),
  pug = require('gulp-pug');

gulp.task('pug', function (done) {
  gulp.src(cnf.src.pug + '/pages/**/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(
        {
          title: 'Compile Error',
          message:'<%= error.message %>',
        }
      )
    }))
    .pipe(changed(cnf.dest.html, {extension: '.html'}))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug({
      // locals: JSON.parse(fs.readFileSync(paths.YOUR_LOCALS, 'utf-8')),
      pretty: true
    }))
    .pipe(gulp.dest(cnf.dest.html));
    done();
});

gulp.task('pug:watch', function (done) {
  gulp.watch('app/**/*.pug', gulp.series('pug'));
  done();
});


