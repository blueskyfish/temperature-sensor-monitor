/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var minimist = require('minimist');

var params = minimist(process.argv.slice(2));

var contextPath = _removePostSlash(_adjustPath(params.contextPath || ''));

var userConfig = null;

module.exports = {

  /**
   * Returns the target. If the parameter `target` is not exist, then it returns `develop`.
   * @return {string}
   */
  getTarget: function () {
    return params.target || 'develop';
  },

  /**
   * Returns true, when the parameter `target` exists and the value is `prod`.
   * @return {boolean}
   */
  isDeployment: function () {
    return params.target === 'prod'
  },

  /**
   * Returns the distribution path
   * @param {string} [pathname] the additional path
   * @return {string}
   */
  getPath: function (pathname) {
    return getPath_(this.getTarget(), pathname);
  },

  /**
   * Returns the context path.
   * @param {string} [pathname] the additional path
   * @return {string}
   */
  getContextPath: function (pathname) {
    return getContextPath_(pathname);
  },

  getUserConfig: function () {
    return getUserConfig_();
  }
};

function getPath_(target, pathname) {
  var dist = 'dist' + _adjustPath(target);
  if (!pathname || pathname === '') {
    return dist;
  }
  return dist + _adjustPath(pathname);
}

function getContextPath_(pathname) {
  if (!pathname || pathname === '') {
    return contextPath;
  }
  return contextPath + _adjustPath(pathname);
}

function getUserConfig_() {
  if (!userConfig) {
    var userHome = process.env['HOME'] || process.cwd();
    var filename = path.join(userHome, '.temperature-sensor-monitor.json');
    if (!fs.existsSync(filename)) {
      userConfig = {};
    }
    else {
      var context = fs.readFileSync(filename, 'utf8');
      try {
        userConfig = JSON.parse(context);
      } catch (e) {
        userConfig = {};
      }
    }
  }
  return userConfig;
}


function _adjustPath(pathname) {
  if (!pathname || pathname === '') {
    return '';
  }
  if (_.startsWith(pathname, '/')) {
    return pathname;
  }
  return '/' + pathname;
}

function _removePostSlash(pathname) {
  if (!pathname || pathname === '') {
    return '';
  }
  if (_.endsWith(pathname, '/')) {
    return pathname.substr(0, -1);
  }
  return pathname;
}