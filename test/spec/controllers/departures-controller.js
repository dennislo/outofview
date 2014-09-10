'use strict';

describe('Controller: DeparturesControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('outofviewBusStopApp'));

  var DeparturesControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeparturesControllerCtrl = $controller('DeparturesControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
