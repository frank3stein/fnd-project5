// function ParadiseLiveViewModel() {
//   var self = this;
  

//   self.places: ko.observableArray([
//   new Places("Burgerhout Superstore", 51.83156, 4.75507),
//   new Places("Kleib Beginnen en Groot", 51.9159491, 4.4770234),
//   new Places("De Kleine Kapitein", 51.922047, 4.493888),
//   new Places("Plaswijckpark", 51.957642, 4.479396)
//     ]);

//   function Places(place, lat, lng) {
//     var self = this;
//     self.name = place;
//     self.lat = ko.observable(lat);
//     self.lng = ko.observable(lng);
//         var marker = new google.maps.Marker({
//         position: new google.maps.LatLng(lat, lng),
//         title: name,
//         map: map,
//         draggable: true
//     });

//   // This example displays an address form, using the autocomplete feature
//   // of the Google Places API to help users fill in the information.


//   function initialize(ParadiseLiveViewModel) {

//         // Map with Rotterdam point marker
//         var myLatlng = new google.maps.LatLng(51.83156, 4.75507);
//         var mapOptions = {
//           center: myLatlng,
//           // center: { lat: -34.397, lng: 150.644},
//           zoom: 13
//         };
//         var map = new google.maps.Map(document.getElementById('map-canvas'),
//             mapOptions);
//         var marker = new google.maps.Marker({
//         position: myLatlng,
//         map: map,
//         draggable: true,
//         animation: google.maps.Animation.DROP,
//         // animation: google.maps.Animation.BOUNCE,
//         title:"Rotterdam"
//         });


//           // Create the search box and link it to the UI element.
//         var input = /** @type {HTMLInputElement} */(
//           document.getElementById('pac-input'));
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//         var searchBox = new google.maps.places.SearchBox(
//           /** @type {HTMLInputElement} */(input));


//         // Info window Variable

//         var infowindow = new google.maps.InfoWindow({
//           content: contentString
//         });

//         var contentString='';

//   // On Click Marker info window
//     google.maps.event.addListener(marker, 'click', function() {
//     infowindow.open(map,marker);

//     });
// }
// google.maps.event.addDomListener(window, 'load', initialize);

// };
// ko.applyBindings(ParadiseLiveViewModel);


// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.


// function initialize() {

//         // Map with a central point marker
//         var myLatlng = new google.maps.LatLng(ko.observable(City.Rotterdam[0]), ko.observable(City.Rotterdam[1]));
//         var mapOptions = {
//           center: myLatlng,
//           // center: { lat: -34.397, lng: 150.644},
//           zoom: 13
//         };
//         var map = new google.maps.Map(document.getElementById('map-canvas'),
//             mapOptions);
//         var marker = new google.maps.Marker({
//         position: myLatlng,
//         map: map,
//         draggable: true,
//         animation: google.maps.Animation.DROP,
//         // animation: google.maps.Animation.BOUNCE,
//         title:"Rotterdam"
//         });


//           // Create the search box and link it to the UI element.
//         var input = /** @type {HTMLInputElement} */(
//           document.getElementById('pac-input'));
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//         var searchBox = new google.maps.places.SearchBox(
//           /** @type {HTMLInputElement} */(input));


//         // Info window Variable

//         var infowindow = new google.maps.InfoWindow({
//           content: contentString
//         });

//         var contentString='';

//   // On Click Marker info window
//     google.maps.event.addListener(marker, 'click', function() {
//     infowindow.open(map,marker);

//     });
// }

// google.maps.event.addDomListener(window, 'load', initialize);

function Places(name, lat, long, info) {
    var self = this;
    self.name = name;
    self.lat = lat;
    self.long =long;

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: info
  });

    // //if you need the poition while dragging
    // google.maps.event.addListener(marker, 'drag', function() {
    //     var pos = marker.getPosition();
    //     self.lat(pos.lat());
    //     self.long(pos.lng());
    // }.bind(self));

    // //if you just need to update it when the user is done dragging
    // google.maps.event.addListener(marker, 'dragend', function() {
    //     var pos = marker.getPosition();
    //     self.lat(pos.lat());
    //     self.long(pos.lng());
    // }.bind(self));

    google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 5,
    center: new google.maps.LatLng(51, 4),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

    $.ajax({
        url:"https://api.yelp.com/v2/search",
        term:"Child Care", 
        location:"Rotterdam",
        success:function(){},
        dataType:"json"
    });

var viewModel = {
    // $.getJSON("ChildrenParadise.json", function(data){
    //   for (place in Poi){
    //     var PlacesArray = [];
    //     Places[place].name=Poi[place].name;
    //     Places[place].lat=Poi[place].lat;
    //     Places[place].long=Poi[place].long;
    //   }
    //   return PlacesArray;
    // }),

    points:  ko.observableArray([
      new Places("Burgerhout Superstore", 51.83156, 4.75507, "test"),
      new Places("Kleib Beginnen en Groot", 51.9159491, 4.4770234, "test"),
      new Places("De Kleine Kapitein", 51.922047, 4.493888, "test"),
      new Places("Plaswijckpark", 51.957642, 4.479396, "test")
    ])

    // autoComplete: function(){

    //   $('#pac-input').autocomplete({
    //     lookup: function(){

    //       for (place in viewModel.points()){
    //         var places=[];
    //         places[place].value=place.name;
    //       };
    //       console.log(places);
    //       return places;
    //     },

    //     onSelect: function (suggestion) {
    //     alert('You selected: ' + suggestion.value);
    //     }   
    //   })
    // }
}

ko.applyBindings(viewModel);


