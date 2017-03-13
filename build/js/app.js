function initialize(){function e(e){var i=navigator.onLine?"online":"offline";t.className=i,t.innerHTML="Browser is "+i.toUpperCase()+".","online"===i?$("#status").css({opacity:1,visibility:"visible"}).animate({opacity:0},3e3):(t.style.visibility="visible",t.style.opacity="1.0")}var t=document.getElementById("status");window.addEventListener("online",e),window.addEventListener("offline",e),city="Sydney",searchTerm="Sushi";var i={zoom:14,center:new google.maps.LatLng((-33.875),151.209)};map=new google.maps.Map(document.getElementById("map-canvas"),i),infowindow=new google.maps.InfoWindow({maxWidth:400,margin:20}),cityInfo(city),createArray(searchTerm,city),appViewModel.filteredItems=ko.computed(function(){var e=this.filter().toLowerCase();return e?this.resultsArray().filter(function(t){var i=t.name.toLowerCase().indexOf(e)>-1;return t.isVisible(i),i}):this.resultsArray()},appViewModel),ko.applyBindings(appViewModel),google.maps.event.addDomListener(window,"resize",function(){var e=map.getCenter();google.maps.event.trigger(map,"resize"),map.setCenter(e)}),google.maps.event.addDomListener(map,"click",function(){infowindow.close()}),$(document).keypress(function(e){var t=e.keyCode?e.keyCode:e.which;108===t&&$("#places-list").toggleClass("hidden")}),addEventListener("touchstart",function(e){e.touches[0];3==e.touches.length&&$("#places-list").toggleClass("hidden")},!1)}function cityInfo(e){var t=setTimeout(function(){alert("Wikipedia results failed to load. Please try again."),console.log("Ajax request failed to load wiki data")},4e3),i={url:"https://en.wikipedia.org/w/api.php",dataType:"jsonp",cache:!0,callback:"wikiCallback",data:{action:"opensearch",search:e,prop:"revisions"},success:function(e){new City(e),clearTimeout(t)},error:function(){console.log("Error")}};$.ajax(i)}function stringHTTPS(e){return e=String(e).split(":"),e=e[0]+"s:"+e[1]}var mapMarkers=[],map,infowindow,city,searchTerm,City=function(e){var t=e,i=this;i.name=t[0],i.info="<div class='content'><p>"+t[1][0]+"</p><p>"+t[2][0]+"</p><a target='_blank' href="+t[3][0]+'>Go to wikipedia page</a><iframe width="560" height="315" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"src="https://maps.google.com/maps?layer=c&amp;panoid=p-LCAk6lQAkAAAQo8D61dQ&amp;ie=UTF8&amp;source=embed&amp;output=svembed&amp;cbp=13%2C191.81697000000003%2C%2C0%2C0"></iframe><div><small><a href="https://www.google.com/maps/views/" style="color:#0000FF; text-align:left">Views</a>: <a href="https://www.google.com/maps/views/view/112608914008214588092/gphoto/6148751372575589474" style="color:#0000FF; text-align:left">Sydney - Pylon Lookout</a> by <a href="https://www.google.com/maps/views/profile/112608914008214588092" style="color:#0000FF; text-align:left">Olivier Wavre</a></small></div></div>';var o=new google.maps.Marker({position:new google.maps.LatLng((-33.875),151.209),map:map,animation:google.maps.Animation.DROP}),a=new google.maps.InfoWindow;google.maps.event.addListener(o,"click",function(){return function(){a.setContent(i.info),a.open(map,o)}}())},Pins=function(e,t){var i=this,o=e,a=stringHTTPS(o.image_url);i.name=o.name,i.lat=o.location.coordinate.latitude,i["long"]=o.location.coordinate.longitude,i.address=o.location.address[0]+", "+o.location.city+", "+o.location.display_address[3],i.info="<div id='content'><div id='siteNotice'></div><div id='bodyContent'><h2 class='text-center'>"+o.name+"</h2><p>"+o.snippet_text+"</p><p>Rating: "+o.rating+"</p><img src='"+a+"' height='100' width='100'><a target='_blank' href='http://maps.google.com/maps?q=&layer=c&cbll="+i.lat+","+i["long"]+"'><img src='https://maps.googleapis.com/maps/api/streetview?size=100x100&location="+i.lat+","+i["long"]+"' height='100' width='100'></a></div></div>",i.clicked=function(){infowindow.close(),infowindow.setContent(i.info),map.setCenter(n.position),infowindow.open(map,n)};var n=new google.maps.Marker({position:new google.maps.LatLng(i.lat,i["long"]),title:i.name,map:map,icon:"images/iconb"+(t+1)+".png",animation:google.maps.Animation.DROP});i.isVisible=ko.observable(),i.isVisible.subscribe(function(e){e?n.setMap(map):n.setMap(null)}),google.maps.event.addListener(n,"click",function(){return i.clicked}()),window.onorientationchange=function(){var e=window.orientation;switch(e){case 0:$("#content").trigger("resize");break;case 90:$("#content").trigger("resize");break;case-90:$("#content").trigger("resize")}}},pushModelApp=function(e){var t,i=e.businesses,o=i.length;for(t=0;t<o;t++)mapMarkers.push(new Pins(i[t],t));appViewModel.resultsArray(mapMarkers)},createArray=function(e,t){function i(){return Math.floor(1e12*Math.random()).toString()}var o=setTimeout(function(){alert("Yelp results failed to load. Please try again."),console.log("Ajax request failed to load")},4e3),a="https://api.yelp.com/v2/search",n={term:e,location:t,radius_filter:5e3,oauth_consumer_key:"JiPu2WHv2CvMTu2KIJodFw",oauth_token:"a-iQofdMTAKu6n2T3R1i2GZ-FxbNstV3",oauth_nonce:i(),oauth_timestamp:Math.floor(Date.now()/1e3),oauth_signature_method:"HMAC-SHA1",oauth_version:"1.0",callback:"cb"},s=oauthSignature.generate("GET",a,n,"w9FmW2cOcACjQqbBLn9j4f68GQI","1O1GK028G4wbFQtJz3F1FodA-5A");n.oauth_signature=s;var r={url:a,data:n,cache:!0,dataType:"jsonp",success:function(e){pushModelApp(e),clearTimeout(o)},error:function(){}};$.ajax(r)},appViewModel={filter:ko.observable(""),resultsArray:ko.observableArray(),hideList:$("#places-toggle").click(function(){$("#places-list").toggleClass("hidden")})};google.maps.event.addDomListener(window,"load",initialize);