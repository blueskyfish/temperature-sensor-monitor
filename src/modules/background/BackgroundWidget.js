/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').directive('background', [
    '$timeout',
    BackgroundWidget
  ]);

  function BackgroundWidget($timeout) {

    return {
      restrict: 'E',
      scope: true,
      template: '<div class="background" ng-click="backgroundClick()"></div>',
      replace: true,
      link: BackgroundWidgetLink
    };

    function BackgroundWidgetLink($scope, element) {

      var elementBackground = angular.element(element);

      $scope.backgroundClick = function () {
        $timeout(function () {
          elementBackground.removeClass('show');
          // send the event **background.click**
          $scope.$emit('background.click');
        });
      };

      // listen on event **background.show**
      $scope.$on('background.show', function (event, showOrHide) {
        if (showOrHide === true) {
          elementBackground.addClass('show');
        }
        else {
          elementBackground.removeClass('show');
        }
      });
    }
  }

} (window.angular));
