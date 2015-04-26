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
function init(){
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
    };



    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 5,
        center: new google.maps.LatLng(51, 4),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // $.getJSON("https://api.yelp.com/v2/search?term=kids&location=Rotterdam", {
    //     type:"GET",
    //     xhrFields: {withCredentials: false},
    //     contentType:"text/plain",
    //     headers: {},
    //     dataType:"jsonp"    

    // })
    // .done(function(data){
    //     console.log(data);
    // });
    

    // https://github.com/ddo/oauth-1.0a
    // API is used for 
    var oauth = OAuth({
        consumer: {
            public: 'JiPu2WHv2CvMTu2KIJodFw',
            secret: 'w9FmW2cOcACjQqbBLn9j4f68GQI'
        },
        signature_method: 'HMAC-SHA1'
    });

    var token = {
            public: 'a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3',
            secret: '1O1GK028G4wbFQtJz3F1FodA-5A'
    };

    var request_data = {
        url: 'https://api.yelp.com/v2/search',
        method: 'POST',
        data: {
        "term":"Child Care", 
        "location":"Rotterdam"            
        }
    };

    $.ajax({
        url: request_data.url,
        type: request_data.method,
        data: oauth.authorize(request_data, token),
        dataType: "jsonp",
        // data: request_data.data,
        // headers: oauth.toHeader(oauth.authorize(request_data, token))
        }).done(function(data) {
        //process your data here
        console.log(data);
    });
    
    // $.ajax({
    //     type:"GET",
    //     url:"https://api.yelp.com/v2/search",
    //     contentType:"text/plain",
    //     // xhrFields: {
    //     //     withCredentials: false
    //     // },

    //     headers: {
    //         "oauth_consumer_key": "JiPu2WHv2CvMTu2KIJodFw",
    //         "Consumer Secret": "w9FmW2cOcACjQqbBLn9j4f68GQI",
    //         "oauth_token": "g0s2ZK-plPL5sZ3on34swZALW98lVZGB",

    //         // Generating the OAuth signature is done by applying the HMAC-SHA1 with the oauth_token_secret.
    //         "oauth_signature_method":"hmac-sha1",
    //         "oauth_token_secret": "Br6HKB-DxbFhEK7tlnde_kp6La0",
    //     },
    //     data: {
    //     "term":"Child Care", 
    //     "location":"Rotterdam"
    //     },
    //     jsonp: false,
    //     // jsonpCallback: function(data){
    //     //     console.log(data);
    //     // },
    //     dataType:"jsonp",
    //     // error : function(){}
    // });
var viewModel = {
    // //Data
    // var self = this;
    // self.pins = ko.observableArray([]);
    // self.newPinInfo = ko.observable();

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
};
ko.applyBindings(viewModel);
};
google.maps.event.addDomListener(window, "load", init);



