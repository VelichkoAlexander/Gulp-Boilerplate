const gulp = require('gulp'),
  cnf = require('../gulpconfig').config,
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  cache    = require('gulp-cache'),
  imagemin = require('gulp-imagemin');

gulp.task('img', function () {
  gulp.src(cnf.src.img.all)
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ])))
    .pipe(gulp.dest(cnf.dest.img));
  gulp.src(cnf.src.img.noCompress)
    .pipe(gulp.dest(cnf.dest.img));
});

gulp.task('img:watch', function () {
  const imgWatcher = gulp.watch('app/img/**/*', ['img']);
  imgWatcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  imgWatcher.on('error', function (event) {
    plumber({errorHandler: notify.onError("Error: <%= error.message %>")});
  });
  
});
