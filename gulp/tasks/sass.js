const gulp = require('gulp'),
  cnf = require('../gulpconfig').config,
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  autoprefixer = require('autoprefixer'),
  rename = require("gulp-rename"),
  postcss = require("gulp-postcss"),
  cssunit = require('gulp-css-unit'),
  csso = require("postcss-csso"),
  mqpacker = require("css-mqpacker"),
  sortCSSmq = require('sort-css-media-queries');

gulp.task('sass', function (done) {
  gulp.src(cnf.src.sass)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      sync: true
    }))
    // .pipe(cssunit({
    //   type: 'px-to-rem',
    //   rootSize: 10
    // }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 5 versions', 'ie 10'],
        remove: true,// remove outdated prefixes?
        cascade: false
      }),
      mqpacker({
        sort: sortCSSmq.desktopFirst
      }),
      csso({
        comments: false
      })
    ]))
    .pipe(rename({
      dirname: "",
      basename: "style",
      prefix: "",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(cnf.dest.css));
  // .pipe(global.browserSync.reload({stream: true}));
  done();
});


gulp.task('sass:watch', function (done) {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  done();
});
