const fs = require('fs')
const gulp = require('gulp')
const merge = require('merge')
const plugins = require('gulp-load-plugins')()

const _config = fs.readFileSync('./gulpfile.json')
const _package = fs.readFileSync('./package.json')

const $ = JSON.parse(_config)
$.package = JSON.parse(_package)

gulp.task('build', ['build:ts', 'build:json'])

gulp.task('build:ts', ['clean'], () => {
  return gulp.src($.sources.ts)
    .pipe(plugins.debug($.debug.ts))
    .pipe(plugins.typescript('tsconfig.json'))
    .pipe(gulp.dest($.destination.lib))
})

gulp.task('build:json', ['clean'], () => {
  return gulp.src($.sources.json)
    .pipe(plugins.debug($.debug.json))
    .pipe(gulp.dest(`${$.destination.lib}/platforms`))
})

gulp.task('clean', () => {
  return gulp.src($.destination.lib)
    .pipe(plugins.debug())
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
