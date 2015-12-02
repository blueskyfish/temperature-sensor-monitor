/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').filter('humidity', [
    '$filter',
    HumidityFilter
  ]);

  function HumidityFilter($filter) {
    var sprintf = $filter('sprintf');

    return function humidityFilter(input, format) {
      if (!input || !angular.isNumber(input)) {
        return '-';
      }
      var template = format || '%f %%';
      return sprintf(template, (parseInt(input, 10) / 100).toFixed(1));
    };
  }

} (window.angular));
