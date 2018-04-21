import './styles.css';
import Marker from './components/Marker';
import yelpApi from './components/fetch';

const vue = new Vue({
    el: '#map',
    data(){
        return {
            businesses:[
            ],
            position:{
                lat: -33.8688,
                lng: 151.2093
            },
            marker: [],
            map:{},
            infowindow: {}
        }
    },
    watch: {
        businesses:function(array){
            array.forEach( data => 
                this.marker.push( new Marker(data, this.map, this.infowindow) )
            );
        }
    },
    created: function(){
        yelpApi('Pizza', this.position, function(err, data){
            data.forEach((element) => {
                vue.businesses.push(element);
            });
        })
    },
    mounted: function(){
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: this.position
          });
        this.infowindow = new google.maps.InfoWindow({
            maxWidth: 400,
            margin: 20
        });
    }
})
