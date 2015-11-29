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
    'tsmEventBus',
    HeaderWidget
  ]);

  function HeaderWidget(tsmEventBus) {

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
          tsmEventBus.send('background.show', true);
          menuContainerBody
            .addClass('show')
            .find('.menu-item').on('click', closeMenuContainer);
        }
        else {
          // hide the menu container
          menuContainerBody
            .removeClass('show')
            .find('.menu-item').off('click', closeMenuContainer);
          tsmEventBus.send('background.show', false);
        }
      });

      var cleanUp = tsmEventBus.subscribe('background.click', closeMenuContainer);

      $scope.$on('$destroy', function () {
        cleanUp();
      });
    }
  }

} (window.angular));
