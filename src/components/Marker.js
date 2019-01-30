function Marker(data, map, infowindow) {
	this.name = data.name;
	this.position = {
		lat: data.coordinates.latitude,
		lng: data.coordinates.longitude
	};
	this.imageHref = data.image_url;
	this.address = `${data.location.address1}, ${data.location.city}, ${data.location.display_address[3]}`;
	this.reviewCount = data.review_count;
	this.rating = data.rating;
	this.price = data.price;
	this.info =
		"<div id='content'>" +
		"<div id='siteNotice'>" +
		'</div>' +
		"<div id='bodyContent'>" +
		"<h2 class='text-center'>" +
		this.name +
		'</h2>' +
		'<p>' +
		this.address +
		'</p>' +
		'<p>Rating: ' +
		this.rating +
		'</p>' +
		"<img src='" +
		this.imageHref +
		"' height='100' width='100'>" +
		"<a target='_blank' href='http://maps.google.com/maps?q=&layer=c&cbll=" +
		this.position.lat +
		',' +
		this.position.lng +
		"'>" +
		"<img src='https://maps.googleapis.com/maps/api/streetview?size=100x100&location=" +
		this.position.lat +
		',' +
		this.position.lng +
		"' height='100' width='100'></a>" +
		'</div>' +
		'</div>';

	this.marker = new google.maps.Marker({
		position: {
			lat: this.position.lat,
			lng: this.position.lng
		},
		title: this.name,
		map: map,
		animation: google.maps.Animation.DROP
	});

	this.clicked = () => {
		//Arrow function so that when called with the event listener this points to where this function is declared. Which is the current Marker.
		infowindow.close();
		infowindow.setContent(this.info);
		infowindow.open(map, this.marker);
	};
	google.maps.event.addListener(this.marker, 'click', this.clicked);
}

export default Marker;
