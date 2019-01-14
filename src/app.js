import './styles.css';
import Marker from './components/Marker';
import yelpApi from './components/fetch';

const vue = new Vue({
	el: '#app',
	data: function() {
		return {
			businesses: [],
			position: {
				//Sydney
				lat: -33.8688,
				lng: 151.2093
			},
			markers: [],
			map: {},
			infowindow: {},
			query: 'Pizza'
		};
	},
	watch: {
		businesses: function(array) {
			array.forEach((data, index) => {
				setTimeout(() => {
					// For a spaced dropping of the markers. Otherwise they drop all at once.
					vue.markers.push(new Marker(data, vue.map, vue.infowindow));
				}, index * 100);
			});
		}
	},
	created: function() {
		yelpApi(this.query, this.position, this.dataToBusinesses);
	},
	mounted: function() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: this.position
		});
		this.infowindow = new google.maps.InfoWindow({
			maxWidth: 400,
			margin: 20
		});
	},
	methods: {
		submit() {
			this.businesses = [];
			this.markers.forEach(function(marker) {
				marker.marker.setMap(null); // marker is my Marker object which has a marker object `marker.marker`.
			});
			this.markers = [];
			yelpApi(this.query, this.position, this.dataToBusinesses);
		},
		dataToBusinesses(err, data) {
			if (err) {
				console.error(err);
				return;
			}
			data.forEach((element) => {
				this.businesses.push(element);
			});
		}
	}
});
