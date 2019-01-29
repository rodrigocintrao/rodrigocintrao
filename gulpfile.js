var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
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

gulp.task("copy", ["clean-fonts"], function() {
  gulp.src([
    "node_modules/@fortawesome/fontawesome-free/webfonts/**/*"
  ])
  .pipe(gulp.dest("./dist/fonts/"));
});

// WATCH:
gulp.task("watch", function() {
  return gulp.watch(["./scss/**/*.scss"], ["sass"]);
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
  "copy",
  "watch",
  "serve"
]);
