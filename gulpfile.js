/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');

var dateformat = require('dateformat');
var requireDir = require('require-dir');

var settings = require('./gulp/gulp-settings');


// include all gulp tasks and helper functions
requireDir('gulp');

gulp.task('serve', [
  'clean',
  'connect',
  'watch'
]);

gulp.task('deploy', [
  'build-deploy'
]);

gulp.task('deploy-serve', [
  'connect-serve',
  'watch-deploy'
]);


