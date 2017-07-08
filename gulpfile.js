'use strict';
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  minify = require("gulp-csso"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  mqpacker = require("css-mqpacker"),
  pug = require('gulp-pug'),
  rename = require("gulp-rename"),
  del = require("del"),
  svgstore = require("gulp-svgstore"),
  svgmin = require("gulp-svgmin"),
  imagemin = require("gulp-imagemin"),
  bourbon = require("node-bourbon").includePaths,
  browserSync = require("browser-sync"),
  notify = require('gulp-notify'),
  ftp = require('vinyl-ftp'),
  reload =  browserSync.stream;


var paths = {
  devDir: 'app/',
  outputDir: 'build/'
};


/*********************************
 Developer tasks
 *********************************/
//clean before start
gulp.task('cleanBeforeStart', function () {
  del(['tmp/*.html']);
});
// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: paths.devDir
    }
  });
});

//pug compile
gulp.task('pug', function () {
  var YOUR_LOCALS = './content.json';
  gulp.src('app/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      // locals: JSON.parse(fs.readFileSync(YOUR_LOCALS, 'utf-8')),
      pretty: true
    }))
    .pipe(gulp.dest(paths.devDir))
    .pipe(reload({stream: true}));
});

//SCSS compile
gulp.task('scss', function () {
  gulp.src('app/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: bourbon,
      errLogToConsole: true,
      sync: true
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest(paths.devDir + 'css/'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(paths.devDir + 'css/'))
    .pipe(reload({stream: true}));
});


//watch
gulp.task('watch', function () {
  gulp.watch(paths.devDir + '**/*.pug', ['pug']);
  gulp.watch(paths.devDir + '**/*.sass', ['scss']);
  // gulp.watch(paths.devDir + '**/*.js', ['scripts']);
});



/*********************************
 Production tasks
 *********************************/

//clean
gulp.task("clean", function () {
  return del("build");
});

//copy images to outputDir
gulp.task('imgBuild', function () {
  return gulp.src(paths.devDir + "img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(paths.outputDir + 'img/'));
});

//js compile
// gulp.task('scripts', function () {
//   return gulp.src( paths.devDir + 'js/')
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest(paths.outputDir + 'js/'))
//     .pipe(browserSync.stream());
// });

gulp.task("symbols", function () {
  return gulp.src("app/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest(paths.devDir + 'img/'));
});

gulp.task("copy",['clean'],function () {
  return gulp.src([
    paths.devDir + "fonts/**/*.{woff,woff2}",
    paths.devDir + "js/**",
    paths.devDir + "*.html",
    paths.devDir + "css/**"
  ], {
    base: "./app"
  })
    .pipe(gulp.dest(paths.outputDir));
});

//ftp
gulp.task('send', function () {
  var conn = ftp.create({
    host: '',
    user: '',
    password: '',
    parallel: 5
  });
  
  /* list all files you wish to ftp in the glob variable */
  var globs = [
    'build/**/*',
    '!node_modules/**' // if you wish to exclude directories, start the item with an !
  ];
  
  return gulp.src(globs, {base: '.', buffer: false})
    .pipe(conn.newer('/')) // only upload newer files
    .pipe(conn.dest('/'))
    .pipe(notify("Dev site updated!"));
  
});

//default
gulp.task('default', ['cleanBeforeStart','browser-sync', 'watch', 'pug', 'scss']);

//production
gulp.task('prod', ['copy', 'imgBuild']);


