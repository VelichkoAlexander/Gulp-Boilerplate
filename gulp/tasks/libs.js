const gulp = require("gulp"),
  cnf = require("../gulpconfig").config,
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  rename = require("gulp-rename"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify");

gulp.task("libs", function() {
  gulp
    .src(cnf.libs.js)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(uglify())
    .pipe(concat("lib.min.js"))
    .pipe(gulp.dest(cnf.dest.js));
});

gulp.task("libs:watch", function() {
  gulp.watch(cnf.libs.js, ["libs"]);
});
