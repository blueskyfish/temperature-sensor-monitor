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
var st = require('st');
var modRewrite = require('connect-modrewrite');

var config = require('./gulp-config').connect;
var settings = require('./gulp-settings');

gulp.task('connect', ['build-develop'], function () {
  console.info(JSON.stringify(config.options.rewriteRules, null, 3));
  connect.server({
    root: [settings.getPath()].concat(config.path),
    port: config.port,
    livereload: true,
    middleware: function () {
      return [
        st({ path: 'bower_components', url: '/bower_components', cache: false }),
        st({ path: 'node_modules', url: '/node_modules', cache: false }),
        st({ path: 'src/modules', url: '/src/modules', cache: false}),
        st({ path: 'app', url: '/app', cache: false}),
        modRewrite(config.options.rewriteRules)
      ];
    }
  })
});

gulp.task('connect-serve', function () {
  var contextPath = settings.getContextPath();
  if (!contextPath || contextPath === '') {
    console.warn('Missing parameter "contextPath"');
    process.exit(1);
  }
  if (!settings.isDeployment()) {
    console.warn('Missing parameter "target"');
    process.exit(1);
  }
  var options = {
    path: settings.getPath(),
    url: contextPath
  };
  connect.server({
    root: [settings.getPath()],
    port: config.port,
    middleware: function () {
      return [
        st(options)
      ];
    }
  });
});

gulp.task('watch-connect', function () {
  console.log('watch the connection');
});