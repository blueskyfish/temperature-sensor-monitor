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
    SensorController
  ]);


  function SensorController($scope, $state) {

    $scope.headerTitle = 'Temperature Monitor';

    $scope.showDialog = false;

    $scope.openSettingDialog = function () {
      $scope.showDialog = true;
    };

    $scope.closeDialog = function () {
      $scope.showDialog = false;
    };

    $scope.initSensorView = function () {
      $state.go('.list');
    };
  }

} (window.angular));
