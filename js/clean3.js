// var Poi = [
//     {
//         name:"Burgerhout Superstore",
//         lat: 51.83156,
//         long: 4.75507,
//         info:"Json Test"
//         },
//     {
//         name:"Kleib Beginnen en Groot",
//         lat: 51.9159491,
//         long: 4.4770234,
//         info:"test"     
//         },
//     {
//         name:"De Kleine Kapitein",
//         lat: 51.922047,
//         long: 4.493888,
//         info:"test" 
//         },
//     {
//         name:"Plaswijckpark",
//         lat: 51.957642,
//         long: 4.479396,
//         info:"test"     
//         }
//     ];
// var $yelpSearchResults = [];
// var mapMarkers = ko.observableArray([]);
var mapMarkers = [];
var map;

function init(){

    // Google Maps initialized in Rotterdam
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 12,
        center: new google.maps.LatLng(51.9167, 4.5000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: map.center,
        title: name,
        map: map
        });
    var infowindow = new google.maps.InfoWindow({
        content: "Rotterdam"
        });
            google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }



    


    // The Pins function puts the markers and infowindows on the map.
    var Pins = function (data, place) {
        // deleteMarkers();
        var self = this;
        self.name = data.businesses[place].name;
        self.lat = data.businesses[place].location.coordinate.latitude;
        self.long =data.businesses[place].location.coordinate.longitude;
        self.info= data.businesses[place].snippet_text;



        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lat, self.long),
            title: self.name,
            map: map
        });
        // markers.push(self.marker);
        
        // Creating Infowindow.
        var infowindow = new google.maps.InfoWindow({
          content: self.name+self.info
        });

        // When clicked the markers open the infowindow.
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }


    
var makeYelpArray = function(data){
        // mapMarkers.setMap(null);
        for (place in data.businesses){
            mapMarkers.push(new Pins(data, place));
        }
        console.log(mapMarkers);
    };



var search = function (searchTerm, searchCity){
    console.log(searchTerm);


    /**
 * Generates a random number and returns it as a string for OAuthentication
 * @return {string}
 */
function nonce_generate() {
  return (Math.floor(Math.random() * 1e12).toString());
}

var yelp_url = 'https://api.yelp.com/v2/search';

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
        // console.log(results);
            makeYelpArray(results);
            // console.log(makeYelpArray);
        
      },
      error: function() {
        // Do stuff on fail

      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);


}

var viewModel = function (){

    var self = this;
    // Search term as observable to check the Yelp database each time a search is made
    self.searchTerm = ko.observable();
    self.searchTerm("Children Activities");
    // City can be changed but for this project it will remain Rotterdam
    self.searchCity = ko.observable("Rotterdam");
    // self.mapMarkers = ko.observableArray([]);
    // self.currentSearch = ko.observable(new search)


    self.currentSearch = ko.computed(function(){
        return search(self.searchTerm(), self.searchCity());
        // console.log(search(self.searchTerm(), self.searchCity()));
    }, self);
    // self.results = search(self.searchTerm(), self.searchCity());
    self.pins = ko.observableArray([]);
    self.pins.push( self.currentSearch().mapMarkers);
    console.log(mapMarkers());
    // mapMarkers.forEach(function(data, place){
    //     for (place in data.businesses)
    //     self.pins.push( new Pins(data.businesses, place)  );
    //     console.log("hi");
    // });
    // console.log(self.pins());
    // console.log($yelpSearchResults);
    // self.data = ko.computed(function(){
    //     var results;
    //     for (place in $yelpSearchResults){
    //         results.push(new Places($yelpSearchResults[place].name, $yelpSearchResults[place].location.coordinate.latitude, $yelpSearchResults[place].location.coordinate.longitude, $yelpSearchResults[place].snippet_text));
    //         console.log(results);
    //     }
    //     return self.points(results);
    // });    


    // self.data = (function(){
    //     console.log($yelpSearchResults);

    //     for (place in $yelpSearchResults){
    //         self.points.push(new Places($yelpSearchResults[place].name, $yelpSearchResults[place].location.coordinate.latitude, $yelpSearchResults[place].location.coordinate.longitude, $yelpSearchResults[place].snippet_text));
    //     }
    // })();

    
};

ko.applyBindings(new viewModel());

google.maps.event.addDomListener(window, "load", init);



