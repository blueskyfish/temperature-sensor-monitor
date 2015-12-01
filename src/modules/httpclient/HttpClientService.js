/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').factory('tsmHttpClient', [
    '$http', '$q', '$log', 'tsmHttpClientConst', 'tsmUtils',
    HttpClientService
  ]);

  function HttpClientService($http, $q, $log, tsmHttpClientConst, tsmUtils) {

    return {

      /**
       * Starts a request with **GET** and returns in the promise then the response.
       * @param {string} url
       * @return {q.promise}
       */
      doGet: function (url) {
        return _execute('GET', url);
      },

      /**
       * Starts a request with **POST** and returns in the promise then the response.
       * @param {string} url
       * @param {object} data
       * @return {q.promise}
       */
      doPost: function (url, data) {
        return _execute('POST', url, data);
      },

      /**
       * Starts a request with **PUT** and returns in the promise then the response.
       * @param {string} url
       * @param {object} data
       * @return {q.promise}
       */
      doPut: function (url, data) {
        return _execute('PUT', url, data);
      },

      /**
       * Starts a request with **DELETE** and returns in the promise then the response.
       * @param {string} url
       * @return {q.promise}
       */
      doDelete: function (url) {
        return _execute('DELETE', url);
      }
    };

    /**
     * Executes the request and returns the response with the given http method
     * @param {string} method
     * @param {string} url
     * @param {object} [data]
     * @private
     */
    function _execute(method, url, data) {
      var config = _buildConfig(method, url, data);
      return $http(config).then(
        _successHandler,
        _errorHandler
      );
    }

    function _successHandler(response) {
      if (_isStatusOkay(response.status || -1)) {
        var data = _parseData(response.data || '{}');
        $log.debug('[%s] receive data from "%s: %s"',
          Date.now(), response.config.method, response.config.url);
        return data;
      }
      return $q.reject({ status: response.status });
    }

    function _errorHandler(response) {
      var data = _parseData(response.data || '{}');
      $log.error('[%s] receive data from "%s: %s"',
        Date.now(), response.config.method, response.config.url);
      return data;
    }

    function _buildConfig(method, url, data) {
      var config = {
        url: null,
        method: method,
        data: null
      };
      // adjust the url property
      if (tsmUtils.startsWith(url, '/')) {
        config.url = tsmHttpClientConst.BASE_URL + url;
      }
      else {
        config.url = tsmHttpClientConst.BASE_URL + '/' + url;
      }
      // adjust the data property
      config.data = data ? JSON.stringify(data) : null;

      return config;
    }

    function _isStatusOkay(status) {
      return !!(status >= 200 && status <= 299);
    }

    function _parseData(data) {
      if (angular.isString(data)) {
        try {
          return angular.fromJson(data);
        } catch (e) {
          return data;
        }
      }
      return data;
    }
  }

} (window.angular));
