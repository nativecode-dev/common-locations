const fs = require('fs')
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

const config = fs.readFileSync('./gulpfile.json')
const $ = JSON.parse(config)

gulp.task('build', ['build:js', 'build:json'])

gulp.task('build:js', () => {
  return gulp.src($.sources.js)
    .pipe(plugins.debug($.debug.js))
    .pipe(plugins.babel($.plugins.babel))
    .pipe(gulp.dest($.destination.lib))
})

gulp.task('build:json', () => {
  return gulp.src($.sources.json)
    .pipe(plugins.debug($.debug.json))
    .pipe(gulp.dest($.destination.lib))
})

gulp.task('clean', () => {
  return gulp.src($.destination.lib)
    .pipe(plugins.clean())
})

gulp.task('test', ['build'], () => {
  return gulp.src($.sources.tests)
    .pipe(plugins.mocha($.plugins.mocha))
})

gulp.task('default', ['build'])
