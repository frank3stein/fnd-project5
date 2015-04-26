function init(){
	var myLatlng = new google.maps.LatLng(51.9167,4.5);
	var mapOptions = {
	  zoom: 8,
	  center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	var marker = new google.maps.Marker({
	    position: myLatlng,
	    title:"Hello World!"
	});

  	var infowindow = new google.maps.InfoWindow({
     	content: marker.title
 	});

	// To add the marker to the map, call setMap();
marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map,marker);
  	});    
}
  
google.maps.event.addDomListener(window, 'load', init);

function Pin (data){
	var self = this;
	self.lat = ko.observable(data.Poi.lat);
	self.lng = ko.observable(data.Poi.long);
	self.info= ko.observable(data.Poi.info);
	self.name= ko.observable(data.Poi.name);



}

function AppViewModel() {
	var self = this;
	self.mapPins = ko.observableArray([]);
	self.pinInfo = ko.observable();
	console.log(self.mapPins);

    // Load initial state from server, convert it to Task instances, then populate self.tasks
    $.getJSON("ChildrenParadise.json", function(allData) {
        var mappedPins = $.map(allData, function(item) { return new Pin(item) });
        self.mapsPins(mappedPins);
    });

}
ko.applyBindings(new AppViewModel());




// var Map = function(lat, lng, info){
//     var map = new google.maps.Map(document.getElementById('map-canvas'), {
//         zoom: 5,
//         center: new google.maps.LatLng(lat, lng),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//     var marker = new google.maps.Marker({
// 		position: new google.maps.LatLng(lat, lng),
// 		title: name,
// 		map: map
// 	});

// 	var infowindow = new google.maps.InfoWindow({
//         content: info
//    	});

//    	google.maps.event.addListener(marker, 'click', function() {
//         infowindow.open(map,marker);
//     });
// };

// function	AppViewModel(){
// 	var self = this;
// 	var lat = ko.observable(51);
// 	var lng = ko.observable(4);
// 	var info = ko.observable("Rotterdam");
// 	self.firstDiv = ko.observable();
// 	self.secondDiv = ko.observable();
// 	self.infoWindowInfo = ko.computed(function(){
// 		return self.firstDiv("<p>Here is an example</p>") + self.secondDiv("<p>Here is an second example</p>");
// 	}, this);

// 	var init = new Map(lat, lng, info);
// 	init();

// }

// ko.applyBindings(new AppViewModel());

