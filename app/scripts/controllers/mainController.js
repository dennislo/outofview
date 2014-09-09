'use strict';

/**
 * @ngdoc function
 * @name outofviewBusStopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main Controller of the outofviewBusStopApp
 */
angular.module('outofviewBusStopApp')
  .controller('MainController', ['$scope', function ($scope) {
    $scope.searchTerm = '';
    $scope.doSearch = function () {
      alert($scope.searchTerm);
    }
  }]);
