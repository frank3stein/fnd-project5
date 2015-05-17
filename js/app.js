function init(){

    // Google Maps initialized in Rotterdam with Rotterdam Centered Marker
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
    };


var search = (function (searchTerm, resultArray) {
  function nonce_generate() {
      return (Math.floor(Math.random() * 1e12).toString());
    }
    resultArray =[];
    var yelp_url = 'https://api.yelp.com/v2/search';

    var parameters = {
        term: searchTerm,
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
        for (var place in data.businesses){
        self.resultArray.push(data.businesses[place]);
            // console.log(makeYelpArray);
        console.log(resultArray);
        }
        return resultArray;
      },
      error: function() {
        // Do stuff on fail
        // alert("Fail");
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);
    return resultArray;
})(appViewModel);

var appViewModel = function() {
      // Variable Declarations
  var self = this;
      self.searchTerm = ko.observable("Children Activities");
      self.resultArray = ko.observableArray([]);

      // Search Function
      self.resultArray=ko.computed(function(){
        return self.resultArray(search(self.searchTerm(), self.resultArray()));
      }, self);
      self.pins=ko.observableArray([

      ]);
      self.filterPins = ko.computed(function () {
        var search  = self.searchTerm().toLowerCase();
          return ko.utils.arrayFilter(self.pins(), function (pin) {
            var doesMatch = pin.name().toLowerCase().indexOf(search) >= 0;
            pin.isVisible(doesMatch);
            return doesMatch;
          });
      });

};






ko.applyBindings(new appViewModel());
google.maps.event.addDomListener(window, "load", init);
