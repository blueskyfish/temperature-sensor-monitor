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
    '$timeout',
    'tsmBackgroundService',
    HeaderWidget
  ]);

  function HeaderWidget($timeout, tsmBackgroundService) {

    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      templateUrl: 'widget/header/HeaderWidget.html',
      scope: {
        headerTitle: '=tsmHeader'
      },
      link: HeaderWidgetLink
    };

    function HeaderWidgetLink($scope, element) {

      var menuContainerBody = angular.element(element).find('.menu-container');

      $scope.show = false;

      function closeMenuContainer() {
        $scope.show = false;
      }

      $scope.menuButtonClick = function () {
        $scope.show = true;
      };

      $scope.$watch('show', function (newValue, oldValue) {
        if (typeof newValue !== 'boolean' || typeof oldValue !== 'boolean') {
          return;
        }
        if (newValue === oldValue) {
          return;
        }
        if ($scope.show) {
          // show the menu container
          tsmBackgroundService.showBackground(true);
          menuContainerBody
            .addClass('show')
            .find('.menu-item').on('click', closeMenuContainer);
        }
        else {
          // hide the menu container
          menuContainerBody
            .removeClass('show')
            .find('.menu-item').off('click', closeMenuContainer);
          tsmBackgroundService.showBackground(false);
        }
      });

      var cleanUp = tsmBackgroundService.addBackgroundListener(closeMenuContainer);

      $scope.$on('$destroy', function () {
        cleanUp();
      });
    }
  }

} (window.angular));
