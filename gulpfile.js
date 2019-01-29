var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload;

//CLEAN CSS:
gulp.task("clean-css-style", function() {
  return del("./code/css/style.css");
});

//CLEAN CSS VENDOR:
gulp.task("clean-css-vendor", function() {
    return del("./code/css/vendor.css");
  });

// SASS:
gulp.task("sass", ["clean-css-style"], function() {
  return gulp
    .src("./scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ browsers: "last 3 versions" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./css/"));
});

// SASS VENDOR:
gulp.task("sass-vendor", ["clean-css-vendor"], function() {
    return gulp
      .src("./scss/vendor/vendor.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer({ browsers: "last 3 versions" }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./css/"));
  });

// WATCH:
gulp.task("watch", function() {
  return gulp.watch(
    ["./scss/**/*.scss"]
  );
});

//SERVE
gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: ""
    }
  });

  gulp.watch("/**/*").on("change", reload);
});

// INIT:
gulp.task("default", [
  "sass",
  "sass-vendor",
  "watch",
  "serve"
]);
