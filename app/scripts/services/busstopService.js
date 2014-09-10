'use strict';

/**
 * @ngdoc service
 * @name outofviewBusStopApp.busStopService
 * @description
 * # busStopService
 * Bus Stop Service in the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .service('busStopService', function busStopService() {
    var savedData = {};

    function set(data) {
      savedData = data;
    }

    function get() {
      return savedData;
    }

    return {
      set: set,
      get: get
    }
  });
