/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').run([
    'tsmHttpClient', HttpClientRun
  ]);

  function HttpClientRun($tsmHttpClient) {
    $tsmHttpClient.doGet('/hello').then(function (result) {
      console.info('Check: ', result);
    });
  }

} (window.angular));
