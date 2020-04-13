const gulp = require('gulp'),
  cnf = require('../gulpconfig').config,
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  postcssImport = require('postcss-easy-import'),
  rename = require("gulp-rename"),
  postcss = require("gulp-postcss"),
  sass = require('postcss-node-sass'),
  csso = require("postcss-csso"),
  sortMediaQueries = require("postcss-sort-media-queries");


gulp.task('sass', function (done) {
  gulp.src(cnf.src.sass)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport({
        extensions: ".scss"
      }),
      sass(),
      autoprefixer({
        overrideBrowserslist: ['last 2 versions', 'ie 10'],
        remove: true,// remove outdated prefixes?
        cascade: false
      }),
      sortMediaQueries({
        sort: 'desktop-first'
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
    .pipe(gulp.dest(cnf.dest.css))
    .pipe(global.browserSync.reload({stream: true}));
  done();
});


gulp.task('sass:watch', function (done) {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  done();
});
