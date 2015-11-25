/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

var config = require('./gulp-config').scripts;

gulp.task('verify-scripts', function () {
  return gulp.src(config.sources)
    .pipe(eslint(config.options.eslint))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
