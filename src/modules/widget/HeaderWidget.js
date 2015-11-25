/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').directive('tsmHeader', [
    'tsmBackgroundService',
    HeaderWidget
  ]);

  function HeaderWidget(tsmBackgroundService) {

    return {
      restrict: 'A',
      templateUrl: 'widget/HeaderWidget.html',
      scope: {
        headerTitle: '=tsmHeader'
      },
      link: HeaderWidgetLink
    };

    function HeaderWidgetLink($scope) {

      $scope.menuButtonClick = function () {
        console.log('MenuButtonClick');
        tsmBackgroundService.showBackground(true);
      };
    }
  }

} (window.angular));