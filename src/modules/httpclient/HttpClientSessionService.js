/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').factory('tsmHttpClientSessionInterceptor', [
    '$log',
    'tsmEventBus',
    'tsmUtils',
    'tsmHttpClientConst',
    HttpClientSessionInterceptor
  ]);

  function HttpClientSessionInterceptor($log, tsmEventBus, tsmUtils, tsmHttpClientConst) {

    var DEFAULT_PIN = '0000';
    var mPin = DEFAULT_PIN;

    tsmEventBus.subscribe('user.login', function (event, data) {
      $log.debug('[%s] user has login...', Date.now());
      _userLogin(data);
    });

    tsmEventBus.subscribe('user.logout', function () {
      $log.debug('[%s] user has logout...', Date.now());
      mPin = DEFAULT_PIN;
    });

    return {

      request: function (config) {
        if (!_isRestRequest(config.url)) {
          return config;
        }
        if (!config.headers) {
          config.headers = {};
        }

        config.headers['x-temperature-sensor'] = mPin;

        return config;
      },

      response: function (response) {
        if (!_isRestRequest(response.config.url)) {
          return response;
        }
        var pin = _getHeader(response.headers, 'x-temperature-sensor', DEFAULT_PIN);
        $log.debug('[%s] url "%s" returns pin "%s: %s"',
          Date.now(), response.config.method, response.config.url, pin);
        return response;
      }
    };

    function _userLogin(user) {
      mPin = user.pin || DEFAULT_PIN;
    }

    function _getHeader(headers, name, def) {
      if (angular.isFunction(headers)) {
        return headers(name);
      }
      return headers[name] || def;
    }

    function _isRestRequest(url) {
      return tsmUtils.startsWith(url, tsmHttpClientConst.BASE_URL);
    }
  }

} (window.angular));
