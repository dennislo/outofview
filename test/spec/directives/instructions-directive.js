'use strict';

describe('Directive: instructionsDirective', function () {

  // load the directive's module
  beforeEach(module('outofviewBusStopApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<instructions-directive></instructions-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the instructionsDirective directive');
  }));
});
