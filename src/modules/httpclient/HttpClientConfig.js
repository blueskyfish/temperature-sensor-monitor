/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').config([
    '$httpProvider',
    HttpClientConfig
  ]);

  function HttpClientConfig($httpProvider) {
    // headers
    $httpProvider.defaults.headers.common = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    $httpProvider.interceptors.push('tsmHttpClientSessionInterceptor');

  }

} (window.angular));
