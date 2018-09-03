function initMap() {
	console.log("initMap");
	var directionsService = new google.maps.DirectionsService;
	var placeOptions = {
		types: ['geocode'],
		componentRestrictions: {country: "vn"},
	};
	var startPlace, endPlace;
	startPlace = new google.maps.places.Autocomplete(
 		document.querySelector('#startPlace'),
        placeOptions
    );
    startPlace.addListener('place_changed', function() {
    	appData.startPlace = {
    		name: document.querySelector("#startPlace").value,
    		lat: startPlace.getPlace().geometry.location.lat(),
    		lng: startPlace.getPlace().geometry.location.lng(),
    	}
    	console.log(appData.startPlace);
    	findDirection(startPlace, endPlace);
    });
    endPlace = new google.maps.places.Autocomplete(
 		document.querySelector('#endPlace'),
        placeOptions
    );
    endPlace.addListener('place_changed', function() {
    	appData.endPlace = {
    		name: document.querySelector("#endPlace").value,
    		lat: startPlace.getPlace().geometry.location.lat(),
    		lng: startPlace.getPlace().geometry.location.lng(),
    	}
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
		    appData.distance = totalDistance;
		    appData.travelTime = totalDuration;
		    return {
		        distance: totalDistance ,
		        duration: totalDuration ,
		    }
		}
		var showEstimate = function(result) {
			document.querySelector('#distance').innerHTML = convertDistance(result.distance);
			document.querySelector('#travelTime').innerHTML = convertTravelTime(result.duration);
			calculatePostage();
		}
		var callback = function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				//console.log(calcRouteTime(response));
				showEstimate(calcRouteTime(response));
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
  //'https://maps.googleapis.com/maps/api/js?key=AIzaSyDDJCfm026nu_AEN7fdhEWxmNV-OuJvgPg&libraries=geometry,places,drawing',
  'https://maps.googleapis.com/maps/api/js?v=3&libraries=visualization,drawing,geometry,places&key=AIzaSyA56R0C2n_rs_oJajhK1s_iGffr3zPjjo8&language=vn',
  initMap
);