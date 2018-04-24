const gulp = require("gulp"),
  cnf = require("../gulpconfig").config,
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify");

gulp.task("js", function() {
  return gulp
    .src(cnf.src.js)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(cnf.dist.js));
});

gulp.task("js:watch", function() {
  gulp.watch(cnf.src.js, ["js"]);
});
