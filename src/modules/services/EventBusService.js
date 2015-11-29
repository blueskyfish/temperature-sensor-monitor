/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

(function (angular) {
  'use strict';

  angular.module('tsm').factory('tsmEventBus', [
    '$log',
    '$timeout',
    EventBus
  ]);

  function EventBus($log, $timeout) {

    var mEventMap = {};

    return {

      /**
       * Add a listener to the event list.
       *
       * @param {string} event the name of the event
       * @param {function} listener the callback listener
       * @return {function} the clean up function, that remove from the event list.
       */
      subscribe: function (event, listener) {
        return subscribe_(event, listener);
      },

      /**
       * Send an event with their data.
       *
       * @param {string} event the event
       * @param {*} [data] the data object
       * @param {boolean} [asyncCall] call the listener async or not
       */
      send: function (event, data, asyncCall) {
        send_(event, data, asyncCall);
      }
    };

    function subscribe_(event, listener) {
      if (!angular.isString(event) || event === '') {
        $log.error('name of event should be a string and not empty');
        return _emptyCleanup;
      }
      if (!angular.isFunction(listener)) {
        $log.error('listener should be a function...');
        return _emptyCleanup;
      }
      var eventList = mEventMap[event];
      if (!angular.isArray(eventList)) {
        mEventMap[event] = eventList = [];
      }
      eventList.push(listener);
      // clean up function
      return function cleanUp() {
        var index = eventList.indexOf(listener);
        if (index >= 0) {
          eventList.splice(index, 1);
          return true;
        }
        return false;
      };
    }

    function send_(event, data, asyncCall) {
      if (!angular.isString(event) || event === '') {
        $log.error('name of event should be a string and not empty');
        return;
      }
      $log.debug('send event "%s"', event);
      var eventList = mEventMap[event] || [];
      var callAsync = asyncCall || true;

      if (eventList.length === 0) {
        return;
      }
      if (callAsync === true) {
        $timeout(function () {
          _executeEvent(eventList, event, data);
        });
      }
      else {
        _executeEvent(eventList, event, data);
      }
    }

    function _executeEvent(eventList, event, data) {
      angular.forEach(eventList, function (listener) {
        listener(event, data);
      });
    }

    function _emptyCleanup() {
      return false;
    }
  }

} (window.angular));
