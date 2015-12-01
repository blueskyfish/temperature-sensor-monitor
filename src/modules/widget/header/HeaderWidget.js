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
        var menuItem = angular.element(this);
        var notHideBackground = !!menuItem.attr('data-not-hide-background');
        $log.debug('[%s] close menu container (notHideBackground: %s)', Date.now(), notHideBackground);
        _showMenu(false, notHideBackground);
      }

      function _showMenu(showOrHide, notHideBackground) {
        if (showOrHide === true) {
          $log.debug('[%s] show the menu container', Date.now());
          tsmEventBus.send('background.show', true);
          menuContainerBody
            .addClass('show')
            .find('.menu-item')
            .on('click', closeMenuContainer);
        }
        else {
          $log.debug('[%s] hide the menu container', Date.now());
          menuContainerBody
            .removeClass('show')
            .find('.menu-item')
            .off('click', closeMenuContainer);
          if (notHideBackground === false) {
            tsmEventBus.send('background.show', false);
          }
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
