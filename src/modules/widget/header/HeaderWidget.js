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
    '$log',
    'tsmEventBus',
    HeaderWidget
  ]);

  function HeaderWidget($log, tsmEventBus) {

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

      function closeMenuContainer() {
        $log.debug('[%s] close menu container', Date.now());
        _showMenu(false);
      }

      function _showMenu(showOrHide) {
        if (showOrHide === true) {
          $log.debug('[%s] show the menu container', Date.now());
          tsmEventBus.send('background.show', true);
          menuContainerBody
            .addClass('show')
            .on('click', closeMenuContainer);
        }
        else {
          $log.debug('[%s] hide the menu container', Date.now());
          menuContainerBody
            .removeClass('show')
            .off('click', closeMenuContainer);
          tsmEventBus.send('background.show', false);
        }
      }

      $scope.menuButtonClick = function () {
        _showMenu(true);
      };

      var cleanUp = tsmEventBus.subscribe('background.click', function (event, ev) {
        closeMenuContainer(ev);
      });

      $scope.$on('$destroy', function () {
        cleanUp();
      });
    }
  }

} (window.angular));
