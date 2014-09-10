'use strict';

/**
 * @ngdoc overview
 * @name outofviewBusStopApp
 * @description
 * # outofviewBusStopApp
 *
 * Main module of the application.
 */
angular.module('outofviewBusStopApp', [
  'ngRoute',
  'ngAnimate',
  'ngCookies',
  'ngTouch'
]).config(['$httpProvider', '$routeProvider',
  function ($httpProvider, $routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '../views/main.html',
        controller: 'MainController'
      })
      .when('/departures/:atcocode', {
        templateUrl: '../views/departures.html',
        controller: 'DeparturesController'
      })
      .otherwise({
        redirectTo: '/'
      });

    function prepareRequestInterceptors() {

      $httpProvider.interceptors.push(['$q', '$log', function ($q, $log) {
          return {
            request: function (request) {
              // On request success
              return request || $q.when(request);
            },
            requestError: function (rejection) {
              // On request failure
              return $q.reject(rejection);
            },
            response: function (response) {
              // On response success
              return response || $q.when(response);
            },
            responseError: function (rejection) {
              // On response failure
              $log.error('$httpProvider.interceptors $q rejection occurred: ' + JSON.stringify(rejection));
              return $q.reject(rejection);
            }
          };
        }]
      );
    }

    prepareRequestInterceptors();

  }
]);
