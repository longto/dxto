const rule = {
	'4-seat' : {
		'1-way' : 6.5,
		'2-way' : 8.5,
		'overtime' : 30,
	},
	'7-seat' : {
		'1-way' : 7.5,
		'2-way' : 10,
		'overtime' : 30,
	},
	'16-seat' : {
		'1-way' : 10.3,
		'2-way' : 13.7,
		'overtime' : 50,
	}
}
function calculatePostage() {
	if (!appData.distance) {
		document.querySelector('#price').innerHTML = "";
		return;
	}
	let carType = appData.carType || '4-seat';
	let directionType = appData.directionType || '1-way';
	let hour = appData.time.hour || (new Date()).getHours();
	let distance = appData.distance;
	let price = distance*rule[carType][directionType];
	if (hour>=3 && hour<=7) price +=rule[carType]['overtime'];
	price = Math.round(price/10000)*10000;
	appData.price = price;
	document.querySelector('#price').innerHTML = price.toLocaleString()+" VNĐ";
}
function convertDistance(distance) {
	return distance > 100 ? (Math.round(distance/100) / 10).toLocaleString()+' km' : distance.toLocaleString()+' m';
}
function roundMoney(a) {
	let b = a - a | 0; a = a | 0;
	return b > 0.5 ? a+1 : a; 
}
var divide = function(a, b) {
	let c = a/b|0, d = a-b*c;
	return [d,c];
}
var convertTravelTime = function(seconds) {
	let travelTime = [Math.round(seconds)];
	const limit = [60,60,24,7,4,12];
	//console.log(travelTime);
	for(let i=0;i<limit.length;i++) {
		let currentUnit = travelTime[travelTime.length-1];
		//console.log(currentUnit, limit[i], travelTime, currentUnit < limit[i]);
		if (currentUnit < limit[i]) break;
		travelTime = travelTime.slice(0,travelTime.length-1).concat(divide(currentUnit,limit[i]));
	}
	let travelTimeString = '';
	const unit = ['giây','phút','giờ','ngày','tuần','tháng','năm'];
	const showSeconds = travelTime.length < 3;
	travelTime.forEach(function(e,i) {
		if (!showSeconds && i===0) return;
		if ( e>0 ) travelTimeString = ' '+e +' '+unit[i]+ travelTimeString;
	})
	return travelTimeString;
}