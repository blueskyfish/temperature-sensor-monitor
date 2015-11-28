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
    'tsmBackgroundService',
    DialogWidget
  ]);

  function DialogWidget(tsmBackgroundService) {

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
          tsmBackgroundService.showBackground(true);
          dialogBody.addClass('show');
        } else {
          dialogBody.removeClass('show');
          tsmBackgroundService.showBackground(false);
        }
        tsmBackgroundService.showBackground(newValue);
      });

      var cleanUp = tsmBackgroundService.addBackgroundListener(function () {
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
