# Bus Stop App 
Create a bus stop look up application using an REST API, Google Maps, Google Geocoding API.

# Getting Started
## Running App

```
  git clone git@github.com:dennislo/outofview.git
  npm install
  bower install
  grunt serve
```

Once app is started follow the instructions inside app to perform a search for bus stops

* Building 'production' deployable package from source

```
  grunt build
```

Once build finishes then copy `dist` folder output to your web server

## Using app

Instructions:
  1. Type in a London Borough or Postcode in the input textbox
  2. Click the "Go!" button and wait for the app to load closest surrounding bus stops
  3. Select a bus stop "red dot" on the map to view and click "View Departures"

![Image of instructions](https://raw.githubusercontent.com/dennislo/outofview/master/app/images/instructions.png)

# Information / Notes

**NOTE:** Transport API does not have CORS support, therefore app currently uses mocked Transport API responses.

## Author
* Name: Dennis Lo
* Email: lo.dennis@gmail.com

## Technologies Used
* HTML5: session storage
* CSS3 + SASS
* ECMAScript 5.1 (Javascript)
* Yeoman
* Grunt
* Bower

## Frameworks
* AngularJS
* Bootstrap

## APIs
* Google Maps API: https://developers.google.com/maps/documentation/javascript/tutorial
* Google Geocoding API: https://developers.google.com/maps/documentation/geocoding/
* Transport API: http://transportapi.com/v3/uk/bus/stops/bbox.json and http://transportapi.com/v3/uk/bus/stop/busAtcoCode/live.json'

## Potential improvements - if time permitted
* Remove JSON response mocks, as the Transport API does not support CORS e.g. enable dynamic look up of bus stops
* Add 'real' unit tests using jasmine/karma e.g. test driven development
* Add validation to input box e.g. prevent submission on empty
* Add loading spinners for AJAX calls e.g. indicate processing
