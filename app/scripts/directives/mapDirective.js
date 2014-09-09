'use strict';

/**
 * @ngdoc directive
 * @name outofviewBusStopApp.directive:mapDirective
 * @description
 * # mapDirective
 */
angular.module('outofviewBusStopApp')
  .directive('mapDirective', ['$timeout', function ($timeout) {
    return {
      templateUrl: '/views/templates/map.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        function initialize() {
          var mapOptions = {
            center: new google.maps.LatLng(51.5072, 0.1275),
            zoom: 8
          };
          var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
        }

        $timeout(function () {
          initialize(); //wait until directive dom ready before injecting google map
        });


      }
    };
  }]);
