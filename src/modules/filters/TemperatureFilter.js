/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').filter('temperature', [
    '$filter',
    TemperatureFilter
  ]);

  function TemperatureFilter($filter) {

    var sprintf = $filter('sprintf');

    return function temperatureFilter(input, format) {
      if (!input || !angular.isNumber(input)) {
        return '-';
      }
      var template = format || '%.1f °';
      return sprintf(template, (parseInt(input, 10) / 100).toFixed(1));
    };
  }
} (window.angular));
