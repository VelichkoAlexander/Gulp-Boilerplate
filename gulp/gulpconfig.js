const app = 'app';
const dist = 'dist';

module.exports = {
  config: {
    projectName : 'MyAwesomeProject',
    src: {
      sass: `${app}/scss/style.scss`,
      html: `${app}`,
      pug: `${app}/pug/`,
      js: `${app}/js/main.js`,
      fonts: `${app}/fonts/**/*.*`,
      img: {
        all: [
          `${app}/img/**/*.*`,
          `!${app}/img/noCompress/**/*.*`
        ],
        noCompress: `${app}/img/noCompress/**/**.*`
      }
    },
    dist: {
      css: `${dist}/css/`,
      html: `${dist}/`,
      js: `${dist}/js/`,
      fonts: `${dist}/fonts`,
      img: `${dist}/img`,
    },
    libs: {
      js: `${app}/js/libs/**.**`,
    },
  }
};
