/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').controller('tsmSensorController', [
    '$scope', '$state', 'tsmBackgroundService',
    SensorController
  ]);


  function SensorController($scope, $state, tsmBackgroundService) {

    $scope.headerTitle = 'Temperature Monitor';

    var cleanUp = tsmBackgroundService.addBackgroundListener(function () {
      console.log('Background clicked...');
    });

    $scope.initSensorView = function () {
      $state.go('.list');
    };

    $scope.$on('$destroy', function () {
      cleanUp();
    });
  }

} (window.angular));
