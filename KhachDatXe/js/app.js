$(document).ready(function(){
	$(document).ready(function(){
    	$('.tabs').tabs({
    	});
  	});
});

var appData = {
	name: undefined,
	tel: undefined,
	startPlace: undefined,
	endPlace: undefined,
	date: now,
	time: currentTime,
	carType: '4-seat',
	directionType: '1-way',
	distance: 0,
	travelTime: 0,
	price: 0,
};

var config = {
    apiKey: "AIzaSyCdMOOC4yyY9-KXipeMvyAk5GVFvNmto10",
    authDomain: "datxetaxi-ac27b.firebaseapp.com",
    databaseURL: "https://datxetaxi-ac27b.firebaseio.com",
    projectId: "datxetaxi-ac27b",
    storageBucket: "datxetaxi-ac27b.appspot.com",
    messagingSenderId: "343651525049"
  };
firebase.initializeApp(config);
var storage = firebase.storage();
var database = firebase.database();
var refTrips = database.ref('/trips');

["name","tel","carType","directionType"].forEach(function(key) {
	document.querySelector("#"+key).addEventListener('change', function(e) {
		appData[key] = e.target.value;
		calculatePostage();
	});
})
document.querySelector("#bookButton").addEventListener('click', function(e) {
	//console.log(appData);
	if (validation()) {
		let newTrip = Object.assign({}, appData, {
			date: appData.date.toString(),
			time: pad(currentTime.hour)+":"+pad(currentTime.minute),
			createTime: firebase.database.ServerValue.TIMESTAMP
		});
		console.log(newTrip);
		refTrips.push(newTrip);
	}
});



//TODO : convert it to cloudfunction 
firebase.auth().signInWithEmailAndPassword('test@hanoi.com','123456').catch(function(error){
    console.log(error.code,error.message);
}).then(function(user){
	console.log(user);
	initApp();
});

function initApp() {
	refTrips.once("value", function(snapshot) {
        let messages = snapshot.val();
        console.log(messages);
    });
}
