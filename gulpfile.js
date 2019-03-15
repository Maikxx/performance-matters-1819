const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('minifyCss', () => {
    return gulp.src('./client/src/css/*.css')
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            browsers: [
                'last 2 versions',
                '> 1%',
                'maintained node versions',
                'not dead'
            ],
        }))
        .pipe(gulp.dest('./server/public/css'))
})

gulp.watch(['./server/src/css/*.css'], gulp.series('minifyCss'))