// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initialize() {
  var Rotterdam = new google.maps.LatLng(51.9167, 4.5000);
  var mapOptions = {
    zoom: 12,
    center: Rotterdam,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
  });

  // Adds a marker at the center of the map.
  addMarker(Rotterdam, "city");
}

// Add a marker to the map and push to the array.
function addMarker(location, info) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    content: info
  });
  mapMarkers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

var appViewModel = function(){
  var self = this;
  self.searchTerm = ko.observable("Children Activities");
  self.mapMarkers = ko.observableArray([]);
  var makeYelpArray = function(data){
        // mapMarkers.setMap(null);
        for (place in data.businesses){
            appViewModel.mapMarkers().push(new addMarker(data));
        }
        console.log(mapMarkers);
    };
  self.search = ko.computed(function (){
    // console.log(searchTerm);
    // console.log(searchTerm());
    console.log(self.searchTerm);
    console.log(self.searchTerm());
    function nonce_generate() { 
      return (Math.floor(Math.random() * 1e12).toString());
    }

    var yelp_url = 'https://api.yelp.com/v2/search';

    var parameters = {
        term: self.searchTerm(),
        location: "Rotterdam",
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
      success: function(data) {
        // Do stuff with results
        // console.log(results);
        makeYelpArray(data);
            // console.log(makeYelpArray);
        
      },
      error: function() {
        // Do stuff on fail

      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);



  }, self);

}
ko.applyBindings(new appViewModel);
google.maps.event.addDomListener(window, 'load', initialize);