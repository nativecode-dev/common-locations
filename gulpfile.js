const fs = require('fs')
const gulp = require('gulp')
const merge = require('merge')
const plugins = require('gulp-load-plugins')()

const _config = fs.readFileSync('./gulpfile.json')
const _package = fs.readFileSync('./package.json')

const $ = JSON.parse(_config)
$.package = JSON.parse(_package)

gulp.task('build', ['build:js', 'build:json'])

gulp.task('build:js', () => {
  return gulp.src($.sources.js)
    .pipe(plugins.debug($.debug.js))
    .pipe(plugins.mustache($))
    .pipe(plugins.babel($.plugins.babel))
    .pipe(gulp.dest($.destination.lib))
})

gulp.task('build:json', () => {
  return gulp.src($.sources.json)
    .pipe(plugins.debug($.debug.json))
    .pipe(plugins.mustache($))
    .pipe(gulp.dest($.destination.lib))
})

gulp.task('clean', () => {
  return gulp.src($.sources.clean)
    .pipe(plugins.clean())
})

gulp.task('test', ['build'], () => {
  const env = plugins.env.set(
    merge.recursive(true, $.env.debug, $.env.common)
  )

  return gulp.src($.sources.tests)
    .pipe(plugins.mocha($.plugins.mocha))
    .pipe(env.reset)
})

gulp.task('default', ['build'])
