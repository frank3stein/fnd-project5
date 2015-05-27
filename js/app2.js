// Creating Globals
var mapMarkers=[],
    map,
    infowindow;
//Intialising the map and creating infowindow which will be shared among Pins
function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(-33.9, 151.2)
  };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    infowindow = new google.maps.InfoWindow({
      maxWidth: 200
    });
  // Creating Array with Yelp, populating resultsArray, adding filteredItems to model
  createArray('Sushi', 'Sydney');
  appViewModel.filteredItems = ko.computed(function() {
      var filter = this.filter().toLowerCase();
      if (!filter) {
        return this.resultsArray();
      } else {
          return this.resultsArray().filter(function(item){
            var doesMatch = item.name.toLowerCase().indexOf(filter)>-1;
            item.isVisible(doesMatch);
              return doesMatch;
          });
      }
  }, appViewModel);
  ko.applyBindings(appViewModel);
} // init close
// Get Lat Long from Yelp
// mapOptions.center = new google.maps.LatLng(results.region.center.latitude, results.region.center.longitude2);
var centerMap = function(results){
    lat    = results.region.center.latitude;
    long   = results.region.center.longitude;
};
// Creating the Pin constructor object
var Pins = function (data, i) {
        var self  = this;
        // Pins are created inside Yelp ajax success function
        var yelpData = data.businesses[i];
        // The object properties are taken from Yelp
        self.name = yelpData.name;
        self.lat  = yelpData.location.coordinate.latitude;
        self.long = yelpData.location.coordinate.longitude;
        self.info = "<div id='content'>"+
                    "<h2>"+yelpData.name+"</h2>"+
                    "<p>"+yelpData.snippet_text+"</p>"+
                    "<p>Rating:"+yelpData.rating+"</p>"+
                    "<img src='"+yelpData.image_url+"'>"+
                    "</div>";
        // Method for Pin so it can be called by knockout list data-bind as well
        self.clicked = function(){
          infowindow.setContent(self.info);
          infowindow.open(map,marker);
        };
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lat, self.long),
            title: self.name,
            map: map
        });
        // http://stackoverflow.com/questions/29557938/removing-map-pin-with-search
        self.isVisible = ko.observable();
        self.isVisible.subscribe(function(currentState) {
          if (currentState) {
            marker.setMap(map);
          } else {
            marker.setMap(null);
          }
        });
        // When clicked the markers open the infowindow.
        google.maps.event.addListener(marker, 'click', (function() {
          // Global InfowWindow used as a best practice on
          // google maps. Method of Pin.clicked is called when a Pin is clicked.
          return self.clicked;
        })());
    };

var pushModelApp = function(results){
  var Results = results.businesses,
      LENGTH  = Results.length,
      i;
  for(i=0;i<LENGTH;i++){
      mapMarkers.push(new Pins(results, i));
  // pushing to mapMarkers first so after the loop has finished resultsArray is
  // updated to avoid unnecessary updates to the view in the for loop.
  }
  appViewModel.resultsArray(mapMarkers);
};
// This is the function creating the initial array by ajax call to Yelp
var createArray = function(searchTerm, searchCity){

      function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
      }
      // If there is no response from the server or bad request
      // this function warns using an alert on screen and on console.
       var yelpRequestTimeOut = setTimeout(function(){
         alert("Yelp results failed to load. Please try again.");
         console.log("Ajax request failed to load");
       }, 2000);

       var yelp_url = 'https://api.yelp.com/v2/search';

      //  These parameters are local and private
       var parameters = {
           term: searchTerm,
           location: searchCity,
           radius_filter: 5000,
         oauth_consumer_key: "JiPu2WHv2CvMTu2KIJodFw",
         oauth_token: "a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3",
         oauth_nonce: nonce_generate(),
         oauth_timestamp: Math.floor(Date.now()/1000),
         oauth_signature_method: 'HMAC-SHA1',
         oauth_version : '1.0',
         callback: 'cb'
       };

       var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, "w9FmW2cOcACjQqbBLn9j4f68GQI", "1O1GK028G4wbFQtJz3F1FodA-5A");
       parameters.oauth_signature = encodedSignature;

       var settings = {
         url: yelp_url,
         data: parameters,
         cache: true,
         dataType: 'jsonp',
         success: function(results) {
           // Do stuff with results
           pushModelApp(results);
           clearTimeout(yelpRequestTimeOut);
         },
         error: function() {
           // Do stuff on fail
         }
       };
       // Send AJAX query via jQuery library.
       $.ajax(settings);
 };
var appViewModel = {
  filter        : ko.observable(""),
  resultsArray  : ko.observableArray([])
};
google.maps.event.addDomListener(window, 'load', initialize);
