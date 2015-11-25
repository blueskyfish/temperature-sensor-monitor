/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');

gulp.task('build-develop', [
  'clean',
  'build-styles',
  'build-scripts',
  'build-index',
  'build-templates'
]);


gulp.task('build-deploy', [
  'clean',
  'build-styles',
  'build-scripts',
  'build-index',
  'build-assets',
  'build-templates',
  'build-vendor-scripts',
  'build-vendor-styles',
  'build-vendor-fonts'
]);