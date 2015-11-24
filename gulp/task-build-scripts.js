/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var gif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var config = require('./gulp-config').scripts;
var settings = require('./gulp-settings');

function taskBuildScripts() {
  return gulp.src(config.sources)
    .pipe(gif(settings.isDeployment(), concat(config.name)))
    .pipe(gif(settings.isDeployment(), uglify(config.options.uglify)))
    .pipe(gif(settings.isDeployment(), rename(config.minify)))
    .pipe(gulp.dest(settings.getPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('build-scripts', ['clean'], taskBuildScripts);
gulp.task('watch-scripts', taskBuildScripts);