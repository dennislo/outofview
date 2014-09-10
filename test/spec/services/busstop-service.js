'use strict';

describe('Service: busStopService', function () {

  // load the service's module
  beforeEach(module('outofviewBusStopApp'));

  // instantiate service
  var busStopService;
  beforeEach(inject(function (_busStopService_) {
    busStopService = _busStopService_;
  }));

  it('should do something', function () {
    expect(!!busStopService).toBe(true);
  });

});
