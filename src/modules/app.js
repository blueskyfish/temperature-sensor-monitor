
(function () {
  'use strict';

  angular.module('tsm', [
    'ngAnimate'
  ]);

  angular.module('tsm').run(['$rootScope', '$log', RunApplication]);


  function RunApplication($rootScope, $log) {
    $log.debug('Hallo Temperature Sensor Monitor...');
    $log.debug('...');
  }

} ());

