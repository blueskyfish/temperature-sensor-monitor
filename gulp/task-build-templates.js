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
var gif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var config = require('./gulp-config').templates;
var settings = require('./gulp-settings');


function taskBuildTemplates() {
  return gulp.src(config.sources)
    .pipe(templateCache(config.name, config.options.templates))
    .pipe(gif(settings.isDeployment(), uglify(config.options.uglify)))
    .pipe(gif(settings.isDeployment(), rename(config.minify)))
    .pipe(gulp.dest(settings.getPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('build-templates', ['clean'], taskBuildTemplates);
gulp.task('watch-templates', taskBuildTemplates);