export const initMap = () => {
	console.log("initMap");
	var directionsService = new google.maps.DirectionsService;
	var placeOptions = {
		types: ['geocode'],
		componentRestrictions: {country: "vn"}
	};
	var startPlace, endPlace;
	startPlace = new google.maps.places.Autocomplete(
 		document.querySelector('#startPlace'),
        placeOptions
    );
    startPlace.addListener('place_changed', function() {
    	findDirection(startPlace, endPlace);
    });
    endPlace = new google.maps.places.Autocomplete(
 		document.querySelector('#endPlace'),
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
		    return {
		        distance: totalDistance / 1000 ,
		        duration: totalDuration / 60,
		    }
		}
		var showEstimate = function() {

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

export const loadScript = (src,callback) => {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(callback) script.onload=callback;
  document.querySelector("head").appendChild(script);
  script.src = src;
}