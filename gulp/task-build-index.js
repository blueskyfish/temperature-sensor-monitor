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
var inject = require('gulp-inject');
var htmlMin = require('gulp-htmlmin');
var htmlReplace = require('gulp-html-replace');
var gif = require('gulp-if');

var config = require('./gulp-config').index;
var settings = require('./gulp-settings');

var replaceOptions =  {
  keepUnassigned: false,
  keepBlockTags: false,
  resolvePaths: false
};

function taskBuildIndex() {
  var injectSources = gulp.src(config.options.inject.sources, {read: false});
  return gulp.src(config.sources)
    .pipe(gif(settings.isDeployment(), htmlReplace(config.options.replace, replaceOptions)))
    .pipe(gif(!settings.isDeployment(), inject(injectSources)))
    .pipe(gif(settings.isDeployment(), htmlMin(config.options.htmlMin)))
    .pipe(gulp.dest(settings.getPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('build-index', ['clean'], taskBuildIndex);

gulp.task('watch-index', taskBuildIndex);