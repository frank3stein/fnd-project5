// Creating Globals
var mapMarkers=[],
    map,
    infowindow,
    $yelpArray;

//Intialising the map and creating infowindow which will be shared among Pins
function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(-33.9, 151.2)
  };
    map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);
    // Creating Infowindow.

    infowindow = new google.maps.InfoWindow({
      maxWidth: 300
    });

  // appViewModel.resultsArray.subscribe(appViewModel.markers);
  createArray('Sushi', 'Sydney');
  appViewModel.query.subscribe(appViewModel.search);
  ko.applyBindings(appViewModel);
}

// Creating the Pin object
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
        self.clicked = function(){
          infowindow.setContent(self.info);
          infowindow.open(map,marker);
        };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lat, self.long),
            title: self.name,
            map: map
        });


        // When clicked the markers open the infowindow.
        // only works on list if self.click the function this does not work or
        // not using =
        google.maps.event.addListener(marker, 'click', (function() {
          // Yes there is JSLint suggestion but works
          // perfectly. This listener also returns a click property for each Pin
          // so when the Pins are clicked whether on the map or on the list
          // global infowindow opens. Global InfowWindow used as a best practice on
          // google maps.
          return self.clicked;
          // = function (){
          //   infowindow.setContent(self.info);
          //   infowindow.open(map,marker);
          // };
        })());
    };

var pushModelApp = function(results){
  var Results = results.businesses,
      LENGTH  = Results.length,
      i;
  for(i=0;i<LENGTH;i++){
  // Pins are pushed into Observable array to be shown in the list
  // and to be used in the filter function
  // The purpose to do this on the array is so that no additional steps
  // like dirty checking each marker will be needed. Filtering the array
  // should filter the Pins as well.
  // appViewModel.resultsArray.push(new Pins(results, i));
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
       }, 8000);

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
         callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
       };

       var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, "w9FmW2cOcACjQqbBLn9j4f68GQI", "1O1GK028G4wbFQtJz3F1FodA-5A");
       parameters.oauth_signature = encodedSignature;

       var settings = {
         url: yelp_url,
         data: parameters,
         cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
         dataType: 'jsonp',
         success: function(results) {
           // Do stuff with results
           pushModelApp(results);
          //  console.log(results);

          // here in the commented section the function and data run is not visible
          // to global it is private, so appViewModel.resultsArray() is undefined
          // when run on console
          // Variables defined so less memory is used

            // var Results = results.businesses,
            //     LENGTH  = Results.length,
            //     i;
            // for(i=0;i<LENGTH;i++){
            // // Pins are pushed into Observable array to be shown in the list
            // // and to be used in the filter function
            // // The purpose to do this on the array is so that no additional steps
            // // like dirty checking each marker will be needed. Filtering the array
            // // should filter the Pins as well.
            // appViewModel.resultsArray.push(new Pins(results, i));
            // mapMarkers.push(new Pins(results, i));
            // // mapMarkers.push(new Pins(results, i));
            // }

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
  // var self = this;
  // self.query = ko.observable();
  // self.resultsArray = ko.observableArray(mapMarkers);
  // self.search = ko.computed(function(){
  //   return self.resultsArray;
  // }, self);
  // self          : this,
  query         : ko.observable(),
  resultsArray  : ko.observableArray(),
  // search        : ko.computed(function() {
  //   return appViewModel.resultsArray;
  //   // if (!this.query){
  //   //     console.log(this.resultsArray());
  //   //   return this.resultsArray();
  //   // } else {
  //   //     return ko.utils.arrayFilter(this.resultsArray(), function(pin) {
  //   //       return pin.name.toLowerCase().indexOf(this.query().toLowerCase()) < -1;
  //   //     });
  //   //   }
  // })
};
google.maps.event.addDomListener(window, 'load', initialize);
