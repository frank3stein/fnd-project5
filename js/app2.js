// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to
// (0,32) to correspond to the base of the flagpole.
var mapMarkers=[];
function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(-33.9, 151.2)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);

  setMarkers(map, beaches);
  appViewModel.query.subscribe(appViewModel.search);
  ko.applyBindings(appViewModel);

}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

// http://stackoverflow.com/questions/29557938/removing-map-pin-with-search
var Pin = function Pin(name, lat, lon, text) {
  var marker;

  this.name = ko.observable(name);
  this.lat  = ko.observable(lat);
  this.lon  = ko.observable(lon);
  this.text = ko.observable(text);

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lon),
    animation: google.maps.Animation.DROP
  });

  this.isVisible = ko.observable(false);

  this.isVisible.subscribe(function(currentState) {
    if (currentState) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });

  this.isVisible(true);

  google.maps.event.addListener(marker, 'click', (function(marker) {
    return function(){
      infowindow.setPosition(myLatLng);
      infowindow.open(map, marker);}
})(marker));
};

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  // var image = {
  //   url: 'images/beachflag.png',
  //   // This marker is 20 pixels wide by 32 pixels tall.
  //   size: new google.maps.Size(20, 32),
  //   // The origin for this image is 0,0.
  //   origin: new google.maps.Point(0,0),
  //   // The anchor for this image is the base of the flagpole at 0,32.
  //   anchor: new google.maps.Point(0, 32)
  // };
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  // var shape = {
  //     coords: [1, 1, 1, 20, 18, 20, 18 , 1],
  //     type: 'poly'
  // };

  for (var i = 0; i < locations.length; i++) {
    var beach = locations[i];
    var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
    var infowindow = new google.maps.InfoWindow({
    content: "<p>'+beach[i]+'</p>"
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        // icon: image,
        // shape: shape,
        title: beach[0],
        zIndex: beach[3]
    });


      google.maps.event.addListener(marker, 'click', (function(marker) {
      return function(){
      infowindow.setPosition(myLatLng);
      infowindow.open(map, marker);}
    })(marker));
    }

    mapMarkers.push(marker);
}


var appViewModel = {
  pins: ko.observableArray(beaches),
  query: ko.observable(''),
  search: function(value) {
  // appViewModel.pins.removeAll();

  if (value == '') return;

  for (var pin in pins) {
    if (pins[pin][0].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
      appViewModel.pins.push(pins[pin]);
    }
  }
}

};

google.maps.event.addDomListener(window, 'load', initialize);
