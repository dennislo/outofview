'use strict';

/**
 * @ngdoc service
 * @name outofviewBusStopApp.transportService
 * @description
 * # transportService
 * Service in the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .service('transportService', ['$http', function ($http) {

    function _getBusStops(latLng) {
      //Call transport API to get bus stops by lat and lng
      var url = 'http://transportapi.com/v3/uk/bus/stops/bbox.json';
      url = '/scripts/mocks/busStops.json'; //required since CORS not supported by transport API

      var requestParameters = {
        maxlat: latLng.maxLat,
        maxlon: latLng.maxLng,
        minlat: latLng.minLat,
        minlon: latLng.minLng,
        api_key: 'fed809061ed9956f32d719787fcf8d0e',
        app_id: 'ad0f4534'
      };

      var httpPromise = $http({
        url: url,
        method: 'GET',
        params: requestParameters
      }).then(function (response) {
        return _createBusStopsResponse(response.data);
      });

      return httpPromise;
    }

    function _createBusStopsResponse(data) {
      var result = {};
      result.busStops = data.stops;
      result.searchLocation = {lat: data.searchlat, lng: data.searchlon};
      return result;
    }

    function _getDepartures(busAtcoCode) {
      //Call transport API to get departures by AtcoCode
      var url = 'http://transportapi.com/v3/uk/bus/stop/' + busAtcoCode + '/live.json';
      url = '/scripts/mocks/snoreditch490000169KDepartures.json'; //required since CORS not supported by transport API

      var requestParameters = {
        group: 'route',
        api_key: 'fed809061ed9956f32d719787fcf8d0e',
        app_id: 'ad0f4534'
      };

      var httpPromise = $http({
        url: url,
        method: 'GET',
        params: requestParameters
      }).then(function (response) {
        return _createDepaturesResponse(response.data);
      });

      return httpPromise;
    }

    function _createDepaturesResponse(data) {
      var result = data.departures;
      //... do more data munging if required here ...
      return result;
    }

    return {
      //exposed functions for public consumption
      getBusStops: function (latLng) {
        return _getBusStops(latLng);
      },
      getDepartures: function (busAtcoCode) {
        return _getDepartures(busAtcoCode);
      }
    };

  }]);
