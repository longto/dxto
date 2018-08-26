function initAutocomplete() {
	console.log("initAutocomplete");
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