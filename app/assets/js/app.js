var map;
var markers = [];

function setVisibleMarkers (flag) {
	for(var i in markers){
		flag = flag && map.getBounds().contains(markers[i].getPosition())
		markers[i].setVisible(flag);
	}
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.650757, lng:  -100.289705},
    zoom: 10
  });

  var styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
  map.setOptions({ styles: styles});

  var marker = new google.maps.Marker({
  	position: {lat: 25.650757, lng:  -100.289705},
  	map: map,
  	icon: 'http://dezkareid.github.io/PokeMap/public/img/1.png',
  	visible: false
  });

  var info = new google.maps.InfoWindow({ content: 'Soy bulbasaur'});
  info.setPosition(marker.getPosition());
  marker.addListener('click',function (e) {
  	info.open(map);
  });

  markers.push(marker);

  google.maps.event.addDomListener(map, 'bounds_changed', function() {
    setVisibleMarkers(map.getZoom() >= 13);
  });
  map.setOptions({ disableDefaultUI: true});
}