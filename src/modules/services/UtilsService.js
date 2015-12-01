/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').factory('tsmUtils', [
    UtilsService
  ]);

  function UtilsService() {

    return {

      endsWith: function (s, str) {
        return endsWith_(s, str);
      },

      startsWith: function (s, str) {
        return startsWith_(s, str);
      }

    };

    function endsWith_(s, str) {
      if (!angular.isString(s) || !angular.isString(str)) {
        return false;
      }
      return s.slice(-str.length) === str;
    }

    function startsWith_(s, str) {
      if (!angular.isString(s) || !angular.isString(str)) {
        return false;
      }
      return s.slice(0, str.length) === str;
    }
  }

} (window.angular));
