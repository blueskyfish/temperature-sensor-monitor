/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');
var del = require('del');

var settings = require('./gulp-settings');

gulp.task('clean', function () {
  var distPath = 'dist';
  del([distPath]).then(function () {
    done();
  });
});
