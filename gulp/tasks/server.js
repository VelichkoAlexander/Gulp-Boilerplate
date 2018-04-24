const gulp = require('gulp'),
  cf = require('../gulpconfig').config,
  browserSync = require('browser-sync').create();

global.browserSync = browserSync;

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "dist/"
    },
    notify: false,
    files: ['dist/**/*.{html, js}'],
    open: false,
    logPrefix: cf.projectName,
    // tunnel: true,
    // tunnel: cf.projectName, //Demonstration page: http://projectname.localtunnel.me
  });
});
