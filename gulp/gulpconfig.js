const app = 'app';
const dist = 'dist';

module.exports = {
  config: {
    projectName : 'bigProject',
    src: {
      sass: `${app}/scss/style.scss`,
      html: `${app}`,
      pug: `${app}/pug/`,
      js: `${app}/js/main.js`,
      fonts: `${app}/fonts/**/*.*`,
      pagelist     : `${app}/index.yaml`,
      img: {
        all: [
          `${app}/img/**/*.*`,
          `!${app}/img/noCompress/**/*.*`
        ],
        noCompress: `${app}/img/noCompress/**/**.*`
      }
    },
    dest: {
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
