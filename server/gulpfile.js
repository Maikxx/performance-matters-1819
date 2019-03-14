const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')

gulp.task('minifyCss', () => {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css'))
})

gulp.watch(['src/css/*.css'], gulp.series('minifyCss'))