/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');

var config = require('./gulp-config').vendorFonts;
var settings = require('./gulp-settings');

/**
 * Task **build-vendor-fonts**
 */
gulp.task('build-vendor-fonts', ['clean'], function () {
  return gulp.src(config.sources)
    .pipe(gulp.dest(settings.getPath(config.dest)));
});
