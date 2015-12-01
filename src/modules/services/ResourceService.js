/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').factory('tsmResourceService', [
    '$log',
    '$q',
    'tsmHttpClient',
    ResourceService
  ]);

  function ResourceService($log, $q, tsmHttpClient) {

    return {

      /**
       * Checks whether the external server is available. In the promise return is the flag true or false
       *
       * @return {$q.promise}
       */
      checkServer: function () {
        return checkServer_();
      },

      /**
       * Starts a request to get the sensor information. In the promise return is a list of sensor data.
       *
       * @return {$q.promise}
       */
      sensorInfo: function () {
        return tsmHttpClient.doGet('/info');
      }
    };

    function checkServer_() {
      return tsmHttpClient.doGet('/hello').then(
        function (result) {
          $log.debug('server say hello...', result);
          return $q.resolve(true);
        },
        function (reason) {
          $log.debug('server is not available!!', reason);
          return $q.resolve(false);
        }
      );
    }

  }

} (window.angular));
