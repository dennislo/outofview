'use strict';

/**
 * @ngdoc function
 * @name outofviewBusStopApp.controller:MainCtrl
 * @description
 * # MainController
 * Main Controller of the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .controller('MainController', ['$scope', 'geocodeService', 'transportService', 'gmapService', 'storageService',
    function ($scope, geocodeService, transportService, gmapService, storageService) {

      $scope.searchTerm = '';

      $scope.busMap = {};

      var busStops = [];

      $scope.doSearch = function () {

        storageService.clearAll();  //flush session storage on every search

        geocodeService.doGeocoding($scope.searchTerm.toLowerCase()) //get geocode of borough or postcode
          .then(function (latLngResponse) {

            return transportService.getBusStops(latLngResponse);  //get bus stops by lat and lng

          }).then(function (busStopsResponse) {

            busStops = busStopsResponse.busStops;

            gmapService.createRedDots($scope.busMap, busStopsResponse);  //place bus stops as red dots on map

          }, function (error) {

            alert(error);

          });

      };

      $scope.$on('$routeChangeStart', function (event, newUrl, oldUrl) {
        //save selected/clicked bus stop
        var selectedBusStopId = newUrl.params.atcocode;
        for (var i = 0, len = busStops.length; i < len; i++) {
          if (busStops[i].atcocode === selectedBusStopId) {
            storageService.saveObject('selectedBusStop', busStops[i]);
            break;
          }
        }
      });

    }]);
