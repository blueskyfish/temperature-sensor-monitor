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
var less = require('gulp-less');
var miniCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var config = require('./gulp-config').vendorStyles;
var settings = require('./gulp-settings');

/**
 * Task **build-vendor-styles**
 *
 */
gulp.task('build-vendor-styles', ['clean'], function () {
  return gulp.src(config.sources)
    .pipe(concat(config.name))
    .pipe(gif(settings.isDeployment(), miniCss(config.options.miniCSS)))
    .pipe(gif(settings.isDeployment(), rename(config.minify)))
    .pipe(gulp.dest(settings.getPath(config.dest)));
});