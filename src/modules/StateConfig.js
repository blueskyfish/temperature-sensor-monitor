/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').config(['$stateProvider', '$urlRouterProvider', StateConfig]);

  function StateConfig($stateProvider, $urlRouterProvider) {
    // navigate to the `sensors` state if not match the state (url)
    $urlRouterProvider.otherwise('/sensor');

    $stateProvider
      .state('sensor', {
        url: '/sensor',
        controller: 'tsmSensorController',
        templateUrl: 'states/sensor/SensorController.html'
      })
      .state('sensor.list', {
        templateUrl: 'states/sensor/list/SensorListController.html',
        controller: 'tsmSensorListController'
      });
  }

} (window.angular));
