// function ParadiseLiveViewModel() {
//   var self= this;

// };
// ko.applyBindings(ParadiseLiveViewModel);


// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initialize() {

        // Map with a central point marker
        var myLatlng = new google.maps.LatLng(City.Rotterdam[0], City.Rotterdam[1]);
        var mapOptions = {
          center: myLatlng,
          // center: { lat: -34.397, lng: 150.644},
          zoom: 13
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        // animation: google.maps.Animation.BOUNCE,
        title:"Rotterdam"
        });


          // Create the search box and link it to the UI element.
        var input = /** @type {HTMLInputElement} */(
          document.getElementById('pac-input'));
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var searchBox = new google.maps.places.SearchBox(
          /** @type {HTMLInputElement} */(input));


        // Info window Variable

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var contentString='';

  // On Click Marker info window
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);

    });


  // Adding the Autocomplete Adress Functionality
  // Create the autocomplete object, restricting the search
  // to geographical location types.
      autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
          { types: ['geocode'] });
  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
          fillInAddress();
      });



}


// Filling in the adress form
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}



// Asking the browser for the location position parameters
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}






google.maps.event.addDomListener(window, 'load', initialize);




