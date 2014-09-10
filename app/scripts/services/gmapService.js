'use strict';

/**
 * @ngdoc service
 * @name outofviewBusStopApp.gmapService
 * @description
 * # gmapService
 * Service in the outofviewBusStopApp.
 */
angular.module('outofviewBusStopApp')
  .service('gmapService', [function () {

    var WidgetMap = function () {
      this.map = {};
      this.mapOptions = {};

      this.redDots = [];

      this.infoWindow = {};
      this.infoTitleWindow = {};

      //map defaults to centre of London
      this.centreLat = 51.5072;
      this.centreLng = 0.1275;
      this.defaultZoomLevel = 8;
    };

    function _initializeMap() {
      var widgetMap = new WidgetMap();

      var mapOptions = {
        center: new google.maps.LatLng(widgetMap.centreLat, widgetMap.centreLng),
        zoom: widgetMap.defaultZoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      widgetMap.mapOptions = mapOptions;

      //create new map
      widgetMap.map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

      widgetMap.infoWindow = new google.maps.InfoWindow();
      widgetMap.infoTitleWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(widgetMap.map, 'click', function () {
        _closeInfoWindows(widgetMap);
      });

      return widgetMap;
    }

    function _createRedDot(widgetMap, busStopsResponse) {

      for (var i = 0; i < busStopsResponse.busStops.length; i++) {
        var busStop = busStopsResponse.busStops[i];

        var redDot = _createMarkerInfoData(busStop);

        var redDotContent = _createMarkerBubbleHtml(redDot);

        var redDotOptions = {
          position: redDot.latLng,
          icon: 'markers/mapRedDot.png',
          title: redDot.name ? '' : redDot.name,
          content: redDotContent,
          hoverContent: _createMarkerHoverHtml(redDot)
        };

        var redDotMarker = _createMarker(widgetMap, redDotOptions, widgetMap.map);
        widgetMap.redDots.push(redDotMarker);

        redDotMarker.setMap(widgetMap.map);  //add red dot to map
      }

      fitAllMarkers(widgetMap, busStopsResponse.searchLocation); //try fit all red dots on screen

    }

    function _createMarkerInfoData(busStop) {
      var markerData = {};

      //build info bubble content
      markerData.atcocode = busStop.atcocode;
      markerData.smscode = busStop.smscode;
      markerData.name = busStop.name;
      markerData.mode = busStop.mode;
      markerData.bearing = busStop.bearing;
      markerData.locality = busStop.locality;
      markerData.indicator = busStop.indicator;
      markerData.distance = busStop.distance;

      markerData.latLng = new google.maps.LatLng(busStop.latitude, busStop.longitude);

      return markerData;
    }

    function _createMarkerBubbleHtml(marker) {
      var bubbleHtml;

      bubbleHtml = '<div class="mapPopup"><strong>' + marker.name +
        '</strong><br>' + marker.locality + ' ' + marker.bearing +
        ' <br><em>Indicator:</em> ' + marker.indicator +
        ' <br><em>Distance:</em> ' + marker.distance + ' miles<br><a href="#/departures/' +
        marker.atcocode + '" class="service-details-modal">View Departures</a></div>';

      return bubbleHtml;
    }

    function _createMarkerHoverHtml(marker) {
      return '<div class="mapPopup"><strong>' + marker.name + '</strong></div>';
    }

    //create a single marker to map
    function _createMarker(widgetMap, options, map) {
      var marker = new google.maps.Marker(options);

      //wire up maker hover handler to open info title window
      google.maps.event.addListener(marker, 'mouseover', function () {
        widgetMap.infoTitleWindow.setContent(options.hoverContent);
        widgetMap.infoTitleWindow.open(map, marker);
      });

      google.maps.event.addListener(marker, 'mouseout', function () {
        widgetMap.infoTitleWindow.close();
      });

      //wire up marker click handler to open info window
      google.maps.event.addListener(marker, 'click', function () {
        widgetMap.infoWindow.setContent(options.content);
        widgetMap.infoWindow.open(map, marker);
        widgetMap.infoTitleWindow.close();
      });

      return marker;
    }

    //resize map to fit all red dot markers
    function fitAllMarkers(widgetMap, searchLocation) {
      if (widgetMap.redDots && widgetMap.redDots.length > 0) {
        var centerLat = searchLocation.lat;
        var centerLng = searchLocation.lng;
        var centerLatLng = new google.maps.LatLng(centerLat, centerLng);
        var farMarkerLat = widgetMap.redDots[widgetMap.redDots.length - 1].getPosition().lat();
        var farMarkerLng = widgetMap.redDots[widgetMap.redDots.length - 1].getPosition().lng();

        var redDotMarkerBounds = new google.maps.Circle({center: centerLatLng, radius: _getRadius(farMarkerLat, farMarkerLng, centerLat, centerLng)}).getBounds();

        //increase bounds to take this point
        for (var i = 0; i < widgetMap.redDots.length; i++) {
          redDotMarkerBounds.extend(widgetMap.redDots[i].getPosition());
        }

        //fit all push pin bounds to map
        widgetMap.map.fitBounds(redDotMarkerBounds);
      }
    }

    function _closeInfoWindows(widgetMap) {
      widgetMap.infoWindow.close();
    }

    function _getRadius(centerLat, centerLng, farMarkerLat, farMarkerLng) {
      var R = 6371; // approx. radius of the earth in km
      var dLat = _deg2rad(farMarkerLat - centerLat);
      var dLon = _deg2rad(farMarkerLng - centerLng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(_deg2rad(farMarkerLat)) * Math.cos(_deg2rad(centerLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return ((R * c) * 1000); //return distance in metres
    }

    function _deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    return {
      initializeMap: function () {
        return _initializeMap();
      },
      createRedDots: function (widgetMap, services) {
        return _createRedDot(widgetMap, services);
      }
    };

  }]);