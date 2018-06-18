const gulp = require('gulp'),
  cf = require('../gulpconfig').config,
  browserSync = require('browser-sync').create();

global.browserSync = browserSync;

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "dest/"
    },
    notify: false,
    files: [
      cf.dest.html + '/*.html',
      cf.dest.css + '/*.css',
      cf.dest.js + '/*.js',
      cf.dest.img + '/**/*'
    ],
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    ogConnections: false,
    logFileChanges: true,
    open: false,
    logPrefix: cf.projectName,
    // tunnel: true,
    // tunnel: cf.projectName, //Demonstration page: http://projectname.localtunnel.me
  });
});
