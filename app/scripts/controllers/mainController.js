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

      $scope.busMap = {};

      $scope.doSearch = function () {

        geocodeService.doGeocoding($scope.searchTerm.toLowerCase())
          .then(function (latLngResponse) {

            return transportService.getBusStops(latLngResponse);  //get bus stops by lat and lng

          }).then(function (busStopsResponse) {

            gmapService.createRedDots($scope.busMap, busStopsResponse);  //place bus stops as red dots on map

          }, function (error) {

            alert(error);

          });

      }

    }]);
