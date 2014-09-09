'use strict';

/**
 * @ngdoc directive
 * @name outofviewBusStopApp.directive:mapDirective
 * @description
 * # mapDirective
 */
angular.module('outofviewBusStopApp')
  .directive('mapDirective', ['gmapService', '$timeout', function (gmapService, $timeout) {
    return {
      templateUrl: '/views/templates/map.html',
      scope: {
        busMap: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        $timeout(function () {

          scope.busMap = gmapService.initializeMap(); //wait until directive dom ready before injecting google map

        });


      }
    };
  }]);
