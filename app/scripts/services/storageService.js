'use strict';

/**
 * @ngdoc service
 * @name outofviewBusStopApp.storageService
 * @description
 * # storageService
 * Service in the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .service('storageService', [function () {
    var persistentStore = null;
    if (window.sessionStorage !== undefined) {
      persistentStore = window.sessionStorage;
    } else {
      throw ('session Storage not supported');
    }

    return {
      saveObject: function (label, value) {
        persistentStore.setItem(label, JSON.stringify(value));
      },
      saveValue: function (label, value) {
        persistentStore.setItem(label, value);
      },
      fetchObject: function (label) {
        var value = persistentStore[label];
        if (value === undefined || value.length === 0) {
          return null;
        }
        return JSON.parse(value);
      },
      fetchValue: function (label) {
        var value = persistentStore[label];
        if (value === undefined) {
          return null;
        }
        return value;
      },
      remove: function (label) {
        persistentStore.removeItem(label);
      },
      clearAll: function () {
        persistentStore.clear();
      }
    };
  }]);
