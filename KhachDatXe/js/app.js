$('#startTime').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', minDate : new Date() });
$('#endTime').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', minDate : new Date() });
function initAutocomplete() {
	var directionsService = new google.maps.DirectionsService;
	console.log("initAutocomplete");
	var placeOptions = {
		types: ['geocode'],
		componentRestrictions: {country: "vn"}
	};
	var startPlace, endPlace;
	startPlace = new google.maps.places.Autocomplete(
 		(document.getElementById('startPlace')),
        placeOptions
    );
    startPlace.addListener('place_changed', function() {
    	findDirection(startPlace, endPlace);
    });
    endPlace = new google.maps.places.Autocomplete(
 		(document.getElementById('endPlace')),
        placeOptions
    );
    endPlace.addListener('place_changed', function() {
    	findDirection(startPlace, endPlace);
    });
    function findDirection(startPlace, endPlace) {
		if (!startPlace || !startPlace.getPlace() || !endPlace || !endPlace.getPlace()) return null;
		var calcRouteTime = function(response) {
		    var totalDistance = 0;
		    var totalDuration = 0;
		    var legs = response.routes[0].legs;
		    for (var i = 0; i < legs.length; ++i) {
		        totalDistance += legs[i].distance.value;
		        totalDuration += legs[i].duration.value;
		    }
		    totalDistance = (totalDistance / 1000) | 0;
		    totalDuration = (totalDuration / 60) | 0;
		    return {
		        distance: totalDistance + " km",
		        duration: totalDuration + " min",
		    }
		}
		var callback = function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				console.log(calcRouteTime(response));
			}
		}
		directionsService.route({
	        origin: startPlace.getPlace().geometry.location,
	        destination: endPlace.getPlace().geometry.location,
	        travelMode: google.maps.TravelMode.DRIVING
	    }, callback);
	}
}

var loadScript = function (src,callback){
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(callback) script.onload=callback;
  document.querySelector("head").appendChild(script);
  script.src = src;
}

loadScript(
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDDJCfm026nu_AEN7fdhEWxmNV-OuJvgPg&libraries=geometry,places,drawing',
  initAutocomplete
);