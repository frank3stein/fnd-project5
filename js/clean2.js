var markers = [];
var map;


function appViewModel(){
	var self = this;
    // Search term as observable to check the Yelp database each time a search is made
    self.searchTerm = ko.observable("Children Activities");
    // City can be changed but for this project it will remain Rotterdam
    self.searchCity = ko.observable("Rotterdam");
    self.results = ko.computed(function(){
        return search(self.searchTerm(), self.searchCity());
    }, self);

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
}
ko.applyBindings(new appViewModel());