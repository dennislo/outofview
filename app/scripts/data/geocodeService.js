'use strict';

/**
 * @ngdoc service
 * @name outofviewBusStopApp.geocodeService
 * @description
 * # geocodeService
 * Service in the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .service('geocodeService', ['$http', function ($http) {

    function _doGeocoding(searchTerm) {

      //Call Google Geocode API to get lat and lng
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

      if (searchTerm.indexOf('london') >= 0) {
        url += searchTerm;
      }
      else {
        url += searchTerm + ' london';
      }

      var httpPromise = $http.get(url).then(function (response) {
        return  _createGeocodeResponse(response.data);
      }, function (error) {
      });

      return httpPromise;

    }

    function _createGeocodeResponse(data) {
      var result = {maxLat: 0, maxLng: 0, minLat: 0, minLng: 0};

      //Get 1st match for now
      //TODO: eventually add logic to extract better matching lat and lng
      var viewpointMax = result.maxLat = data.results[0].geometry.viewport.northeast;
      var viewpointMin = result.maxLat = data.results[0].geometry.viewport.southwest;
      result.maxLat = viewpointMax.lat;
      result.maxLng = viewpointMax.lng;
      result.minLat = viewpointMin.lat;
      result.minLng = viewpointMin.lng;

      return result;
    }

    return {
      //exposed functions for public consumption
      doGeocoding: function (searchTerm) {
        return _doGeocoding(searchTerm)
      }
    };

  }]);
