const gulp = require("gulp");
const sass = require("gulp-sass");

const autoprefixer = require('autoprefixer');

const postcss = require('gulp-postcss');

const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const babel = require('gulp-babel');



const browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false,
        online: false,
        open: false
    });

    gulp.watch("src/scss/**/*.scss",gulp.series('sass'))
    gulp.watch("src/js/**/*.js",gulp.series('js'))
    gulp.watch("src/img/**/*",gulp.series("img"))

    gulp.watch("./*.html").on('change', browserSync.reload);

});


gulp.task('sass', () => {
  return gulp.src("src/scss/app.scss")
  .pipe(sass())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(cleanCSS({format:"minify"}))
  .pipe(gulp.dest("dist/css"))
  .pipe(browserSync.stream());

});


gulp.task('js',()=>{
    return gulp.src("src/js/**/*.js")
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());

});

gulp.task('img',()=>{
    return gulp.src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
})


//  gulp.task('watch',()=>{
//     gulp.watch("dist/sass/**/*.scss",gulp.series('sass'))
//     gulp.watch("dist/js/**/*.js",gulp.series('js'))
//     gulp.watch("dist/img/**/*",gulp.series("img"))
//   
// })


gulp.task('default',gulp.series("serve"))