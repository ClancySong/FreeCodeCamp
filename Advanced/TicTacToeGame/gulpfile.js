const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const esLatest = require('babel-preset-latest');
const webpack = require('gulp-webpack');

//  将scss编译为css文件
gulp.task('sass', () => {
    gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

//  浏览器自动刷新
gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: './dist/',
        },
    });
});

// 使用babel及webpack将es6文件编译打包
gulp.task('build', () => {
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: [esLatest],
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(webpack({
            output: {
                filename: 'bundle.js',
            },
            stats: {
                colors: true,
            },
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['sass', 'browserSync', 'build'], () => {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['build']);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/css/*.css', browserSync.reload);
    gulp.watch('dist/js/*.js', browserSync.reload);
});