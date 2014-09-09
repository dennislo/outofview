'use strict';

/**
 * @ngdoc directive
 * @name outofviewBusStopApp.directive:instructionsDirective
 * @description
 * # instructionsDirective
 */
angular.module('outofviewBusStopApp')
  .directive('instructions', function () {
    return {
      templateUrl: '/views/templates/instructions.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
