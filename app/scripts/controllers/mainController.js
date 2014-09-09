'use strict';

/**
 * @ngdoc function
 * @name outofviewBusStopApp.controller:MainCtrl
 * @description
 * # MainController
 * Main Controller of the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .controller('MainController', ['$scope', 'geocodeService', 'transportService', 'gmapService',
    function ($scope, geocodeService, transportService, gmapService) {
      $scope.searchTerm = 'shoreditch london';

      $scope.doSearch = function () {

        geocodeService.doGeocoding($scope.searchTerm.toLowerCase())
          .then(function (latLngResponse) {

            return transportService.getBusStops(latLngResponse);

          }).then(function (busStopsResponse) {

            gmapService.createRedDots(busStopsResponse);

          }, function (error) {

            alert(error);

          });

      }
    }]);
