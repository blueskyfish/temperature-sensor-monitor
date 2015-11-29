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
    'tsmEventBus',
    BackgroundWidget
  ]);

  function BackgroundWidget(tsmEventBus) {

    return {
      restrict: 'E',
      scope: true,
      template: '<div class="background" ng-click="backgroundClick($event)"></div>',
      replace: true,
      link: BackgroundWidgetLink
    };

    function BackgroundWidgetLink($scope, element) {

      var elementBackground = angular.element(element);

      $scope.backgroundClick = function (event) {
        tsmEventBus.send('background.click', event);
      };

      // listen on event **background.show**
      var cleanUp = tsmEventBus.subscribe('background.show', function (event, showOrHide) {
        if (showOrHide === true) {
          elementBackground.addClass('show');
        }
        else {
          elementBackground.removeClass('show');
        }
      });

      $scope.$on('$destroy', function () {
        cleanUp();
      });
    }
  }

} (window.angular));
