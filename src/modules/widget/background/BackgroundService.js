/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').factory('tsmBackgroundService', [
    '$rootScope',
    '$timeout',
    BackgroundService
  ]);

  function BackgroundService($rootScope, $timeout) {

    var listeners = [];

    $rootScope.$on('background.click', function () {
      angular.forEach(listeners, function (listener) {
        $timeout(function () {
          listener();
        }, 10);
      });
    });

    return {

      /**
       * Adds a background listener.
       *
       * @param {function} listener the callback listener
       * @return {function} returns the clear function, that removes the listener.
       */
      addBackgroundListener: function (listener) {
        if (angular.isFunction(listener) && listeners.indexOf(listener) < 0) {
          listeners.push(listener);
          return function cleanUp() {
            var index = listeners.indexOf(listener);
            if (index >= 0) {
              listeners.splice(index, 1);
            }
          };
        }
        return function dummy() {};
      },

      /**
       * Shows or hides the background
       *
       * @param {boolean} showOrHidden
       */
      showBackground: function (showOrHidden) {
        $rootScope.$broadcast('background.show', showOrHidden === true);
      }
    };
  }

} (window.angular));
