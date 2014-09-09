'use strict';

describe('Service: gmapService', function () {

  // load the service's module
  beforeEach(module('outofviewBusStopApp'));

  // instantiate service
  var gmapService;
  beforeEach(inject(function (_gmapService_) {
    gmapService = _gmapService_;
  }));

  it('should do something', function () {
    expect(!!gmapService).toBe(true);
  });

});
