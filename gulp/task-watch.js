/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var gulp = require('gulp');

var config = require('./gulp-config');
var settings = require('./gulp-settings');

gulp.task('watch', function () {
  gulp.watch(config.index.sources, ['watch-index']);
  gulp.watch(config.styles.sources, ['watch-styles']);
  gulp.watch(config.scripts.sources, ['watch-index', 'verify-scripts', 'watch-scripts']);
  gulp.watch(config.templates.sources, ['watch-templates']);
});

gulp.task('watch-deploy', function () {
  var sources = [
    settings.getPath('**/*.*')
  ];
  gulp.watch(sources, ['watch-connect']);
});
