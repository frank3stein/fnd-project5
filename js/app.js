// @global
var mapMarkers = [],
    map,
    infowindow,
    city,
    searchTerm;

//Intialising the map and creating infowindow which will be shared among Pins
function initialize() {

  var status = document.getElementById("status"); //Status at the moment of initialization
  /**
  * Checks the online status of the browser, depending on
  * offline or online changes CSS to let user know of the condition.
  */
  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";

    status.className = condition;
    status.innerHTML = "Browser is "+condition.toUpperCase()+".";
    if (condition === "online"){
    $("#status").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 3000);
    }
    else {
    status.style.visibility = "visible";
    status.style.opacity = "1.0";
    }
  }
  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  city = "Sydney";
  searchTerm = "Sushi";
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(-33.875, 151.209)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  infowindow = new google.maps.InfoWindow({
    maxWidth: 400,
    margin: 20
  });
  // Getting the City info from Wikipedia and putting a marker, not in list or filter
  // cityInfo(city) ---> $.ajax(wiki) ---> new City(wikiData) ----> marker and infowindow(shared global)
  cityInfo(city);
  // Creating Array with Yelp, populating resultsArray, adding filteredItems to model
  createArray(searchTerm, city);
  appViewModel.filteredItems = ko.computed(function() {
      var filter = this.filter().toLowerCase();
      if (!filter) {
        return this.resultsArray();
      } else {
          return this.resultsArray().filter(function(item){
            var doesMatch = item.name.toLowerCase().indexOf(filter)>-1;
            item.isVisible(doesMatch);
              return doesMatch;
          });
      }
  }, appViewModel);
  ko.applyBindings(appViewModel);
  // Map centers itself while resizing
  // @listen Browser resize
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
  // When clicked on map infoWindow closes
  google.maps.event.addDomListener(map, 'click', function(){
    infowindow.close();
  });
  // Toggle the list menu on/off
  // @listen L - keyboard key
  $(document).keypress(function(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if(code === 108) {
      $("#places-list").toggleClass('hidden');
    }
  });
  // Toggle the list menu on/off
  // @listen three finger tap on mobile
  addEventListener('touchstart', function(event){
    var touch = event.touches[0];
    if ( event.touches.length == 3){
      $("#places-list").toggleClass('hidden');
    }
  }, false);
} // init close

/** Calls the wikipedia api for a brief explanation to use at google maps infowindow.
* Runs the City constructor to build city object on the ajax response.
* @param {string} city - The search term for Wikipedia ajax call.
*/
function cityInfo (city){
  var wikiTimeout = setTimeout(function(){
         alert("Wikipedia results failed to load. Please try again.");
         console.log("Ajax request failed to load wiki data");
       }, 4000);
  var settings = {
          url: "https://en.wikipedia.org/w/api.php",
          dataType: "jsonp",
          cache: true,
          callback:"wikiCallback",
          data:{
            action:"opensearch",
            search: city, //@param - Search term
            prop: "revisions"
          },
          success: function(response){
            new City(response);
            clearTimeout(wikiTimeout);
          },
          error: function(){
            console.log("Error");
          }
  };
  $.ajax(settings);
}

/**
* Represents the City
* @constructor
* @param {array} data - receives callback response from cityInfo and builds the map dependencies(marker, infowindow content)
* @create City marker, City infowindow
* @listen click for marker
*/
var City = function(data){
    var wikiData = data;
    var self     = this;
    self.name    = wikiData[0];
    self.info    =  "<div class='content'>"+
                    "<p>"+wikiData[1][0]+"</p>"+
                    "<p>"+wikiData[2][0]+"</p>"+
                    "<a target='_blank' href="+wikiData[3][0]+">Go to wikipedia page</a>"+
                    '<iframe width="560" height="315" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"'+
                    'src="https://maps.google.com/maps?layer=c&amp;panoid=p-LCAk6lQAkAAAQo8D61dQ&amp;ie=UTF8&amp;source=embed&amp;output=svembed&amp;cbp=13%2C191.81697000000003%2C%2C0%2C0"></iframe>'+
                    '<div><small><a href="https://www.google.com/maps/views/" style="color:#0000FF; text-align:left">Views</a>: '+
                    '<a href="https://www.google.com/maps/views/view/112608914008214588092/gphoto/6148751372575589474" style="color:#0000FF; text-align:left">Sydney - Pylon Lookout</a> by <a href="https://www.google.com/maps/views/profile/112608914008214588092" style="color:#0000FF; text-align:left">Olivier Wavre</a></small></div>'+
                    "</div>";

  var marker = new google.maps.Marker({
            position: new google.maps.LatLng(-33.875, 151.209),
            map: map,
            animation: google.maps.Animation.DROP
  });

  var infowindow = new google.maps.InfoWindow(); //(maxWidth();
  google.maps.event.addListener(marker, 'click', (function(){
      return function(){
        infowindow.setContent(self.info);
        infowindow.open(map,marker);
      };
  })());
};//City constructor ends

/**
* @function
* @param   {string} string  - URL with http://
* @return  {string} string  - URL with https://
*/
function stringHTTPS(string){
string = string.split(":");
string = string[0]+"s:"+string[1];
return string;
}

/**
* Represents each pin on the map.
* @constructor
* @param {array} data - Receives Yelp ajax response as an array in pushModelApp
* @param number       - Counter of each pin to be used for marker icon numbers
*/
var Pins = function (data, i) {
        var self  = this;
        // Pins are created inside Yelp ajax success function
        var yelpData = data;
        var httpsImg = stringHTTPS(yelpData.image_url);
        // The object properties are taken from Yelp
        self.name    = yelpData.name;
        self.lat     = yelpData.location.coordinate.latitude;
        self.long    = yelpData.location.coordinate.longitude;
        self.address = yelpData.location.address[0]+", "+yelpData.location.city+", "+yelpData.location.display_address[3];
        // Here data from Yelp, Images from Streetview are stored for each constructed object
        // Street View Image can be clicked to go to the streetview of the adress
        self.info   = "<div id='content'>"+
                      "<div id='siteNotice'>"+
                      "</div>"+
                      "<div id='bodyContent'>"+
                      "<h2 class='text-center'>"+yelpData.name+"</h2>"+
                      "<p>"+yelpData.snippet_text+"</p>"+
                      "<p>Rating: "+yelpData.rating+"</p>"+
                      "<img src='"+httpsImg+"' height='100' width='100'>"+
                      "<a target='_blank' href='http://maps.google.com/maps?q=&layer=c&cbll="+self.lat+","+self.long+"'>"+
                      "<img src='https://maps.googleapis.com/maps/api/streetview?size=100x100&location="+self.lat+","+self.long+"' height='100' width='100'></a>"+
                      "</div>"+
                      "</div>";
        // Method for Pin so it can be called by knockout list data-bind as well
        self.clicked = function(){
          infowindow.close();
          infowindow.setContent(self.info);
          map.setCenter(marker.position);
          infowindow.open(map,marker);
        };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lat, self.long),
            title: self.name,
            map: map,
            icon: "images/iconb"+(i+1)+".png", // @param - counter i
            animation: google.maps.Animation.DROP
        });

         /**
         * appViewModel.filter check
         * @property of Pin
         * @param {boolean} currentState - Adds the marker to the map of the corresponding Pin if true
         */
        self.isVisible = ko.observable();
        self.isVisible.subscribe(function(currentState) {
          if (currentState) {
            marker.setMap(map);
          } else {
            marker.setMap(null);
          }
        });
        // When clicked the markers open the infowindow.
        google.maps.event.addListener(marker, 'click',(function() {
          // Global InfowWindow used as a best practice on
          // google maps. Method of Pin.clicked is called when a Pin is clicked.
          return self.clicked;
        })());

        // When orientation changes, closes and opens the marker again.
            window.onorientationchange = function() {
        var orientation = window.orientation;
            switch(orientation) {
                case 0: $('#content').trigger('resize');
                break;
                case 90: $('#content').trigger('resize');
                break;
                case -90: $('#content').trigger('resize');
                break; }
    };
    };
/**
* @function Constructs pins with Pin constructor passing through Ajax response
* @param {array} results - Gets the data from createArray function - Yelp API.
* @access private
*/
var pushModelApp = function(results){
  var Results = results.businesses,
      rLength  = Results.length,
      i;

  for(i=0;i<rLength;i++){
      mapMarkers.push(new Pins(Results[i],i));
  // pushing to mapMarkers first so after the loop has finished resultsArray is
  // updated to avoid unnecessary updates to the view in the for loop.
  }
  appViewModel.resultsArray(mapMarkers);
};
/**
* @function First member of the chain to build Map Pins. Does the ajax call to Yelp API.
* @param {String} searchTerm - Could be anything from restaurants, bars, theme parks, to specifics like eg. sushi
* @param {String} searchCity - Targeted city
*/
var createArray = function(searchTerm, searchCity){

      function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
      }
      // If there is no response from the server or bad request
      // this function warns using an alert on screen and on console.
       var yelpRequestTimeOut = setTimeout(function(){
         alert("Yelp results failed to load. Please try again.");
         console.log("Ajax request failed to load");
       }, 4000);

       var yelp_url = 'https://api.yelp.com/v2/search';

      // @private
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
         callback: 'cb'
       };

       var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, "w9FmW2cOcACjQqbBLn9j4f68GQI", "1O1GK028G4wbFQtJz3F1FodA-5A");
       parameters.oauth_signature = encodedSignature;

       var settings = {
         url: yelp_url,
         data: parameters,
         cache: true,
         dataType: 'jsonp',
         success: function(results) {
           // Do stuff with results
           pushModelApp(results);
           clearTimeout(yelpRequestTimeOut);
         },
         error: function() {
           // Do stuff on fail
         }
       };
       // Send AJAX query via jQuery library.
       $.ajax(settings);
};
/**
* @controller
* @listen changes in the search field (filter) and the resultsArray which is populated by Pins.
*/
var appViewModel = {
  filter        : ko.observable(""),
  resultsArray  : ko.observableArray(),
  hideList      : $("#places-toggle").click(function() {
                    $("#places-list").toggleClass('hidden');
                  })
};
google.maps.event.addDomListener(window, 'load', initialize);
