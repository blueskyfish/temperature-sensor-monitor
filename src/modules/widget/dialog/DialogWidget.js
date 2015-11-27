/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').directive('dialog', [
    '$timeout', 'tsmBackgroundService',
    DialogWidget
  ]);

  function DialogWidget($timeout, tsmBackgroundService) {

    var TIMEOUT_DIALOG = 200;

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        show: '=',
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
          $timeout(function () {
            dialogBody.addClass('show');
          }, TIMEOUT_DIALOG);
        } else {
          dialogBody.removeClass('show');
          $timeout(function () {
            tsmBackgroundService.showBackground(false);
          }, TIMEOUT_DIALOG);
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
