/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').directive('tsmDialog', [
    'tsmEventBus',
    DialogWidget
  ]);

  function DialogWidget(tsmEventBus) {

    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {
        show: '=tsmDialog',
        modal: '@',
        className: '@'
      },
      templateUrl: 'widget/dialog/DialogWidget.html',
      link: DialogWidgetLink
    };

    function DialogWidgetLink($scope, element) {

      var dialogBody = angular.element(element);

      $scope.$watch('show', function (newValue, oldValue) {
        if (typeof newValue !== 'boolean' || typeof oldValue !== 'boolean') {
          return;
        }
        if (newValue === oldValue) {
          return;
        }
        if (newValue) {
          tsmEventBus.send('background.show', true);
          dialogBody.addClass('show');
        } else {
          dialogBody.removeClass('show');
          tsmEventBus.send('background.show', false);
        }
      });

      var cleanUp = tsmEventBus.subscribe('background.click', function (event, data) {
        if (!$scope.modal) {
          $scope.show = false;
        }
      });

      $scope.$on('$destroy', function () {
        cleanUp();
      });

    }
  }

} (window.angular));
