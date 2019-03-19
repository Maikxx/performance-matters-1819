const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const plumber = require('gulp-plumber')

gulp.task('minifyCss', () => {
    return gulp.src('./client/css/*.css')
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

gulp.task('minifyJs', () => {
    return gulp.src('./client/scripts/*.ts')
        .pipe(plumber({
            errorHandler: function (error) {
                console.error(error.message)
                this.emit('end')
            }
        }))
        .pipe(ts({
            noImplicitAny: true,
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./server/public/scripts'))
})

if (process.env.NODE_ENV !== 'production') {
    gulp.watch(['./client/css/*.css'], gulp.series('minifyCss'))
    gulp.watch(['./client/scripts/*.ts'], gulp.series('minifyJs'))
}