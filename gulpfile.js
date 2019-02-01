var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  reload = browserSync.reload;

//CLEAN CSS:
gulp.task("clean-css-style", function() {
  return del("./dist/css/style.css");
});

//CLEAN CSS VENDOR:
gulp.task("clean-css-vendor", function() {
  return del("./dist/css/vendor.css");
});

//CLEAN FONTS:
gulp.task("clean-fonts", function() {
  return del("./dist/fonts/**/*");
});

//CLEAN JS:
gulp.task("clean-js", function() {
  return del("./dist/js/main.js");
});

// SASS:
gulp.task("sass", ["clean-css-style"], function() {
  return gulp
    .src("./scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ browsers: "last 3 versions" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/css/"));
});

// SASS VENDOR:
gulp.task("sass-vendor", ["clean-css-vendor"], function() {
  return gulp
    .src("./scss/vendor/vendor.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ browsers: "last 3 versions" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/css/"));
});

gulp.task("copy-fontawesome", ["clean-fonts"], function() {
  gulp
    .src(["node_modules/@fortawesome/fontawesome-free/webfonts/**/*"])
    .pipe(gulp.dest("./dist/fonts/"));
});

gulp.task("copy-jquery", ["clean-fonts"], function() {
  gulp
    .src(["node_modules/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest("./dist/js/"));
});

gulp.task("uglify", ["clean-js"], function() {
  return gulp
    .src("js/**/*.js")
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./dist/js/"));
});

// WATCH:
gulp.task("watch", function() {
  return gulp.watch(["./scss/**/*.scss", "./js/**/*.js"], ["sass", "uglify"]);
});

//SERVE
gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch("./dist/**/*.html").on("change", reload);
});

// INIT:
gulp.task("default", [
  "sass",
  "sass-vendor",
  "copy-fontawesome",
  "copy-jquery",
  "uglify",
  "watch",
  "serve"
]);
