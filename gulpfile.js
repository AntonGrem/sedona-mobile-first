const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const posthtml = require("gulp-posthtml");
const htmlmin = require('gulp-htmlmin');
const include = require('posthtml-include');
// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

<<<<<<< HEAD
/*const css = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;*/
=======
exports.styles = styles;
>>>>>>> module7-task1

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

<<<<<<< HEAD
const watcher = () => {
  gulp.watch(gulp.series("styles"));
  gulp.watch("build/*.html").on("change", sync.reload);
}
=======
/*const watcher = () => {
  gulp.watch("source/less/**//*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}*/
>>>>>>> module7-task1

exports.default = gulp.series(
  styles, server, watcher
);

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
}
exports.images = images;

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"))
}
exports.webp = createWebp;

<<<<<<< HEAD
=======

>>>>>>> module7-task1
/*const sprite = () => {
  return gulp.src("source/img/**//*icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;*/

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};
exports.copy = copy;

const clean = () => {
  return del("build");
};
exports.clean = clean;

const html =  () => {
  return gulp.src("source/**/*.html")
    .pipe(posthtml([include()]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};
exports.html=html;

const build = gulp.series(
  clean,
  copy,
  styles,
  html
);
exports.build = build;
