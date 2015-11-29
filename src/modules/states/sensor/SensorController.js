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
    '$scope',
    '$state',
    '$timeout',
    SensorController
  ]);


  function SensorController($scope, $state, $timeout) {

    $scope.headerTitle = 'Temperature Monitor';

    $scope.showDialog = false;

    $scope.openSettingDialog = function () {
      $timeout(function () {
        $scope.showDialog = true;
      }, 300);
    };

    $scope.closeDialog = function () {
      $scope.showDialog = false;
    };

    $scope.initSensorView = function () {
      $state.go('.list');
    };
  }

} (window.angular));
