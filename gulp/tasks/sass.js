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

const postcssPlugins = [
  autoprefixer({
    browsers: ['last 4 versions'],
    remove: true,// remove outdated prefixes?
    cascade: false
  }),
  mqpacker({
    // sort: sortCSSmq.desktopFirst
    sort: sortMediaQueries
  }),
  csso({
    comments: false
  })
];

gulp.task('sass', function (done) {
  gulp.src(cnf.src.sass)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      sync: true
    }))
    .pipe(postcss(postcssPlugins))
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


function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');
  
  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }
  
  return 1;
}


gulp.task('sass:watch', function (done) {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  done();
});
