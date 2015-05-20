// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to
// (0,32) to correspond to the base of the flagpole.
var mapMarkers=[],
    map,
    infowindow,
    $yelpArray;
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
  $(ko.applyBindings(appViewModel));

  // setMarkers(map, beaches);
  // console.log($yelpArray);

}

 // var makeYelpArray = function(results){
 //
 //   return (function($yelpArray){
 //   $yelpArray = createArray("Beach", "Sydney");
 //   console.log($yelpArray);
 //   return $yelpArray;
 // })($yelpArray);
 // };

 var Pins = function (data, i) {
        // deleteMarkers();
        var self  = this;
        var yelpData = data.businesses[i];
        self.name = yelpData.name;
        self.lat  = yelpData.location.coordinate.latitude;
        self.long = yelpData.location.coordinate.longitude;
        self.info = "<div id='content'>"+
                    "<h2>"+yelpData.name+"</h2>"+
                    "<p>"+yelpData.snippet_text+"</p>"+
                    "<p>Rating:"+yelpData.rating+"</p>"+
                    "<img src='"+yelpData.image_url+"'>"+
                    "</div>";

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lat, self.long),
            title: self.name,
            map: map
        });

        mapMarkers.push(marker);

        // When clicked the markers open the infowindow.
        google.maps.event.addListener(marker, 'click', (function(map, marker, infowindow) {
          return self.click = function(){
            // map.setCenter(marker.position);
            infowindow.setContent(self.info);
            infowindow.open(map,marker);
          };
        })(map, marker, infowindow));
    };


 var createArray = function(searchTerm, searchCity){

      function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
      }

       var yelpRequestTimeOut = setTimeout(function(){
         alert("Yelp results failed to load. Please try again.");
         console.log("Ajax request failed to load");
       }, 8000);

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
          //  console.log(results);
            var Results = results.businesses;
            var LENGTH  = Results.length,
                i;
            for(i=0;i<LENGTH;i++){
              appViewModel.resultsArray.push(new Pins(results, i));
            }
              clearTimeout(yelpRequestTimeOut);

         },
         error: function() {
           // Do stuff on fail

         }
       };

       // Send AJAX query via jQuery library.
       $.ajax(settings);

 };

// http://stackoverflow.com/questions/29557938/removing-map-pin-with-search
// var Pin = function Pin(name, lat, lon, text) {
//   var marker;
//
//   this.name = ko.observable(name);
//   this.lat  = ko.observable(lat);
//   this.lon  = ko.observable(lon);
//   this.text = ko.observable(text);
//
//   marker = new google.maps.Marker({
//     position: new google.maps.LatLng(lat, lon),
//     animation: google.maps.Animation.DROP
//   });
//
//   this.isVisible = ko.observable(false);
//
//   this.isVisible.subscribe(function(currentState) {
//     if (currentState) {
//       marker.setMap(map);
//     } else {
//       marker.setMap(null);
//     }
//   });
//
//   this.isVisible(true);
//
// //   google.maps.event.addListener(marker, 'click', (function(marker) {
// //     return function(){
// //       infowindow.setPosition(myLatLng);
// //       infowindow.open(map, marker);}
// // })(marker));
// };
// function onClick(){
//   google.maps.event.addListener(marker, 'click', (function(map, marker, infowindow) {
//   return function(){
//   // console.log(this.position);
//   map.setCenter(this.position);
//   infowindow.setContent(this.info);
//   infowindow.open(map, this);};
// })(map, this.marker, infowindow));
// }
function onClick(){
  // console.log(this.position);
  // decided not to use center
  // map.setCenter(this.position);
  infowindow.setContent(this.info);
  infowindow.open(map, this);
}
// function setMarkers(map, locations) {
//
//   for (var i = 0; i < locations.length; i++) {
//     var beach = locations[i];
//     var myLatLng = new google.maps.LatLng(locations[i].position);
//     var infowindow = new google.maps.InfoWindow({
//     content: locations[i].snippet_text
//     });
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         // icon: image,
//         // shape: shape,
//         title: beach.name
//         // zIndex: beach[3]
//     });
//       mapMarkers.push(marker);
//       // console.log(mapMarkers);
//       onClick(map, marker, infowindow);
//     }
// }

var appViewModel = {
  searchTerm: ko.observable(),
  resultsArray: ko.observableArray(),
  pins: ko.observableArray(mapMarkers),
  query: ko.observable(''),
  // openInfoWindow: ko.computed(function(){
  //   console.log(pins());
  //   // return pins.forEach(function(){
  //   //   infowindow.setContent(this.info);
  //   //   infowindow.open(map, this);
  //   // });
  // }, this),

  // search: ko.computed(function(){
  //
  // }),
  // markers: ko.computed(function(){
  //   return console.log(this.resultsArray);
  //   // setMarkers(map, this.resultsArray);
  // }, map, this),
  // mapLog: console.log(map),
  // init: function(){},
//   search: function(value){
//   // appViewModel.pins.removeAll();
//
//   if (value ==='') return;
//
//   for (var pin in pins) {
//     if (pins[pin][0].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//       appViewModel.pins.push(pins[pin]);
//     }
//   }
// }

};

google.maps.event.addDomListener(window, 'load', initialize);
