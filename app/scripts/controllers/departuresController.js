'use strict';

/**
 * @ngdoc function
 * @name outofviewBusStopApp.controller:DeparturesControllerCtrl
 * @description
 * # DeparturesController
 * Departure Controller of the outofviewBusStopApp
 */
angular.module('outofviewBusStopApp')
  .controller('DeparturesController', ['$scope', '$routeParams', 'transportService', 'storageService',
    function ($scope, $routeParams, transportService, storageService) {

      var busAtcoCode = $routeParams['atcocode'];

      if (busAtcoCode) {
        $scope.busStopId = busAtcoCode;
        $scope.selectedBusStop = storageService.fetchObject('selectedBusStop');

        transportService.getDepartures(busAtcoCode).then(function (departuresResponse) {
          $scope.departures = departuresResponse;
        });

      }

    }]);