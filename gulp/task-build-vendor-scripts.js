/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

var config = require('./gulp-config').vendorScripts;
var settings = require('./gulp-settings');

gulp.task('build-vendor-scripts', ['clean'], function () {
  return gulp.src(config.sources)
    .pipe(concat(config.name))
    .pipe(gulp.dest(settings.getPath(config.dest)));
});
