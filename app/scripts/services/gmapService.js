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

    function _createRedDot(departures) {

      for (var busNumber in departures) {

        var busDepatures = departures[busNumber];

        for (var i = 0; i < busDepatures.length; i++) {
          var departure = busDepatures[i];

          var redDot = createMarkerInfoData(widgetMap, departure, i);

          var redDotContent = createMarkerBubbleHtml(redDot);

          var redDotOptions = {
            position: redDot.latLng,
            icon: 'markers/mapRedDot.png',
            title: redDot.siteName ? '' : redDot.siteName,
            content: redDotContent,
            hoverContent: createMarkerHoverHtml(redDot)
          };

          var redDotMarker = createMarker(widgetMap, redDotOptions, widgetMap.map);
          widgetMap.redDots.push(redDotMarker);

          redDotMarker.setMap(widgetMap.map);  //add red dot to map
        }

      }

    }

    function createMarkerInfoData(widgetMap, departure, siteIndex) {
      var markerData = {};

      //build info bubble content
      markerData.siteIndex = siteIndex;
      markerData.siteId = departure.SiteID;
      markerData.ssId = departure.SSID;
      markerData.siteName = departure.SiteName;

      markerData.addressLine1 = departure.AddressLine1;
      markerData.addressLine2 = departure.AddressLine2;

      markerData.phone = departure.Phone;

      markerData.latLng = new google.maps.LatLng(departure.Latitude, departure.Longitude);

      return markerData;
    }

    function createMarkerBubbleHtml(marker) {
      var bubbleHtml;

      bubbleHtml = '<div class="mapPopup"><strong>' + marker.siteName +
        '</strong><br>' + marker.addressLine1 + ' <br> ' + marker.addressLine2 +
        ' <br>Phone: ' + marker.phone + ' <br><a  href="#/details/' + marker.siteId +
        '/' + marker.ssId + '/' + marker.siteIndex +
        '" class="service-details-modal">View details</a></div>';

      return bubbleHtml;
    }

    function createMarkerHoverHtml(marker) {
      return '<div class="mapPopup"><strong>' + marker.siteName + '</strong></div>';
    }

    return {
      initializeMap: function (mapElementId) {
        return initializeMapHelper(mapElementId);
      },
      createRedDots: function (widgetMap, services) {
        return _createRedDot(widgetMap, services);
      },
      getMapOptions: function (widgetMap) {
        return widgetMap.mapOptions;
      }
    };

  }]);
