const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('minifyCss', () => {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            browsers: [
                'last 2 versions',
                '> 1%',
                'maintained node versions',
                'not dead'
            ],
        }))
        .pipe(gulp.dest('public/css'))
})

gulp.watch(['src/css/*.css'], gulp.series('minifyCss'))