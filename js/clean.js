var Poi = [
    {
        name:"Burgerhout Superstore",
        lat: 51.83156,
        long: 4.75507,
        info:"Json Test"
        },
    {
        name:"Kleib Beginnen en Groot",
        lat: 51.9159491,
        long: 4.4770234,
        info:"test"     
        },
    {
        name:"De Kleine Kapitein",
        lat: 51.922047,
        long: 4.493888,
        info:"test" 
        },
    {
        name:"Plaswijckpark",
        lat: 51.957642,
        long: 4.479396,
        info:"test"     
        }
    ];
var $yelpSearchResults = [];
var markers = [];
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



    // // Add a marker to the map and push to the array.
    // function addMarker(location) {
    //     var marker = new google.maps.Marker({
    //     position: location,
    //     map: map
    // });
    // markers.push(marker);
    // }
    // function setAllMap(map) {
    //     for (var i = 0; i < markers.length; i++) {
    //         markers[i].setMap(map);
    //     }
    // }
    // // Shows any markers currently in the array.
    // function showMarkers() {
    //     setAllMap(map);
    // }
    // // Removes the markers from the map, but keeps them in the array.
    // function clearMarkers() {
    //     setAllMap(null);
    // }
    // // Deletes the markers array
    // function deleteMarkers() {
    //     clearMarkers();
    //     markers = [];
    // }


    // The Pins function puts the markers and infowindows on the map.
    var Pins = function (data) {
        // deleteMarkers();
        var self = this;
        self.name = data.businesses.name;
        self.lat = data.businesses.coordinate.lat;
        self.long =data.businesses.coordinate.long;
        self.info= data.businesses.snippet_text;



        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
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


    //             // Google Maps initialized in Rotterdam
    // map = new google.maps.Map(document.getElementById('map-canvas'), {
    //     zoom: 5,
    //     center: new google.maps.LatLng(51, 4),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });


    // // Usage of OAuth for YELP API https://github.com/ddo/oauth-1.0a
    // var oauth = OAuth({
    //     consumer: {
    //         public: 'JiPu2WHv2CvMTu2KIJodFw',
    //         secret: 'w9FmW2cOcACjQqbBLn9j4f68GQI'
    //     },
    //     signature_method: 'HMAC-SHA1'
    // });

    // var token = {
    //         public: 'a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3',
    //         secret: '1O1GK028G4wbFQtJz3F1FodA-5A'
    // };

    // var request_data = {
    //     url: 'https://api.yelp.com/v2/search',
    //     method: 'GET',
    //     data: {
    //     term :"Child Care", 
    //     location :"Rotterdam"            
    //     }
    // };
    // function Data(data){
    //     console.log(data);
    // }
    // // Requesting Data with a Ajax 
    // $.ajax({
    //     url: request_data.url,
    //     type: request_data.method,
    //     data: oauth.authorize(request_data, token),
    //     cache: true,
    //     dataType: "jsonp",
    //     callback: 'cb',
    //     // data: request_data.data,
    //     // headers: oauth.toHeader(oauth.authorize(request_data, token))
    //     }).done(Data);

    // // 2ND OPTION OAUTH https://github.com/bettiolo/oauth-signature-js
    // var httpMethod = 'GET',
    // url = 'https://api.yelp.com/v2/search',
    // parameters = {
    //     oauth_consumer_key : 'JiPu2WHv2CvMTu2KIJodFw',
    //     oauth_token : 'a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3',
    //     oauth_nonce : 'kllo9940pd9333jh',
    //     oauth_timestamp : '1191242096',
    //     oauth_signature_method : 'HMAC-SHA1',
    //     oauth_version : '1.0',
    //     // file : 'vacation.jpg',
    //     // size : 'original'
    // },
    // consumerSecret = 'w9FmW2cOcACjQqbBLn9j4f68GQI',
    // tokenSecret = '1O1GK028G4wbFQtJz3F1FodA-5A',
    // // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    // encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
    // // generates a BASE64 encode HMAC-SHA1 hash
    // signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
    //     { encodeSignature: false});
    // oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret)
    
    // function Data(data){
    //     console.log(data);
    // }
    // // Requesting Data with a Ajax 
    // $.ajax({
    //     url: url,
    //     type: httpMethod,
    //     data: oauth.authorize(request_data, token),
    //     dataType: "jsonp",
    //     // 'jsonpCallback': 'cb',
    //     // data: request_data.data,
    //     // headers: oauth.toHeader(oauth.authorize(request_data, token))
    //     }).done(Data);

  //   // 3rd Option http://stackoverflow.com/questions/13149211/yelp-api-google-app-script-oauth

  //   var auth = { 
  //       consumerKey: "JiPu2WHv2CvMTu2KIJodFw", 
  //       consumerSecret: "w9FmW2cOcACjQqbBLn9j4f68GQI",
  //       accessToken: "a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3",
  //       accessTokenSecret: "1O1GK028G4wbFQtJz3F1FodA-5A",
  //       serviceProvider : {
  //                   signatureMethod : "HMAC-SHA1"
  //               }
  //   };

  //   var terms = 'food';
  //   var near = 'Rotterdam';

  //   var accessor = {
  //       consumerSecret: auth.consumerSecret,
  //       tokenSecret: auth.accessTokenSecret
  //   };

  //   var parameters = [];
  //       parameters.push(['term', terms]);
  //       parameters.push(['location', near]);
  //       parameters.push(['callback', 'cb']);
  //       parameters.push(['oauth_consumer_key', auth.consumerKey]);
  //       parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  //       parameters.push(['oauth_token', auth.accessToken]);
  //       parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  //   var message = { 
  //       'action': 'https://api.yelp.com/v2/search',
  //       'method': 'GET',
  //       'parameters': parameters 
  //   };

  //   OAuth.setTimestampAndNonce(message);  

  //   OAuth.SignatureMethod.sign(message, accessor);

  //   var parameterMap = OAuth.getParameterMap(message.parameters);
  //   console.log(parameterMap);
  // // parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

  //   $.ajax({
  //       'url' : message.action,
  //       'data' : parameterMap,
  //       'dataType' : 'jsonp',
  //       'jsonpCallback' : 'cb',
  //       'success' : function(data, textStats, XMLHttpRequest) {
  //           console.log(data); 
  //       },
  //       error: function(err) { console.dir(err); }
        
  //   });
  // // var url = OAuth.addToURL(message.action,parameterMap);
  // // var response = UrlFetchApp.fetch(url).getContentText();
  // // var responseObject = Utilities.jsonParse(response);
  // // //have my JSON object, do whatever we want here, like add to spreadsheets

  // 4th Method Needs Browserify
  // Request API access: http://www.yelp.com/developers/getting_started/api_access

// var yelp = require("yelp").createClient({
//   consumer_key: "JiPu2WHv2CvMTu2KIJodFw", 
//   consumer_secret: "w9FmW2cOcACjQqbBLn9j4f68GQI",
//   token: "a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3",
//   token_secret: "1O1GK028G4wbFQtJz3F1FodA-5A"
// });

// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({term: "food", location: "Rotterdam"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });

// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });
// var $yelpSearchResults=[];
var makeYelpArray = function(data){
        markers=[];
        // $yelpSearchResults=[];
        // 
        // console.log(data.businesses);
        // Sets the map on all markers in the array.

        // for(searchResult in data.businesses){
        //     $yelpSearchResults.push(data.businesses[searchResult]);
        // }
        // console.log($yelpSearchResults);
        for (place in data){
            markers.push(new Pins(data));
        }

                    // Sets the map on all markers in the array.



        return markers;
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
    self.searchTerm = ko.observable("Children Activities");
    // City can be changed but for this project it will remain Rotterdam
    self.searchCity = ko.observable("Rotterdam");
    // self.currentSearch = ko.observable(new search)


    self.currentSearch = ko.computed(function(){
        return search(self.searchTerm(), self.searchCity());
    }, self);
    // self.results = search(self.searchTerm(), self.searchCity());
    self.pins = ko.observableArray([]);

    markers.forEach(function(data){
        self.pins.push( new Pins(data)  );
    });
    console.log(self.points());
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



