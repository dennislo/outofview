#Author
* Name: Dennis Lo
* Email: lo.dennis@gmail.com

NOTE: Transport API does not have CORS support, therefore app currently uses mocked Transport API responses.

#How to?
* Running App
  1. git clone this repo
  2. npm install
  3. bower install
  4. grunt serve

  * Once app is started follow the instructions inside app to perform a search for bus stops

* Building 'production ready' package from source
  1. git clone this repo
  2. npm install
  3. bower install
  4. grunt build
  5. copy 'dist' folder output to your web server

#Technologies Used
* HTML5: session storage
* CSS3 + SASS
* ECMAScript 5.1 (Javascript)
* Yeoman
* Grunt
* Bower

##Frameworks
* AngularJS
* Bootstrap

##APIs
* Google Maps API: https://developers.google.com/maps/documentation/javascript/tutorial
* Google Geocoding API: https://developers.google.com/maps/documentation/geocoding/
* Transport API: http://transportapi.com/v3/uk/bus/stops/bbox.json and http://transportapi.com/v3/uk/bus/stop/busAtcoCode/live.json'

#Potential improvements - if time permitted
* Remove JSON response mocks, as the Transport API does not support CORS
* Add 'real' unit tests using jasmine/karma
* Add validation to input box
* Add loading spinners for AJAX calls
