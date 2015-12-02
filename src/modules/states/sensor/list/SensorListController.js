/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').controller('tsmSensorListController', [
    '$scope',
    'tsmResourceService',
    SensorListController
  ]);

  function SensorListController($scope, tsmResourceService) {

    $scope.sensorList = [];

    $scope.initSensorListView = function () {
      tsmResourceService.sensorInfo().then(function (result) {
        if (result.sensors) {
          $scope.sensorList = angular.copy(result.sensors);
          console.log('Found sensor list: ', $scope.sensorList);
        }
      });
    };
  }

} (window.angular));
