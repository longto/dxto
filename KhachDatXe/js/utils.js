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
const mobileNumberHeader = [].concat.apply([], Object.values({
	Viettel : ['096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169', '086', '032', '033', '034', '035', '036', '037', '038', '039'],
	MobiFone : ['090', '093', '089', '0120', '0121', '0122', '0126', '0128', '070', '079', '077', '076', '078'],
	Vinaphone: ['091', '094', '0123', '0124', '0125', '0127', '0129', '088', '083', '084', '085', '081', '082'],
	Vietnamobile: ['092', '0188', '0186', '056', '058'],
	Gmobile : ['099', '0199', '059']
})).sort();

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
function validateMobileNumber(mobileNumber) {
	mobileNumber = mobileNumber.replace(/\s/g, '').replace(/\+84/g, '0');
	if(!/[0-9]{10,11}/g.test(mobileNumber)) return false;
	return mobileNumberHeader.indexOf(mobileNumber.slice(0, -7)) > 0;
}
function validation() {
	document.querySelector("#alert").innerHTML = "";
	const visibleFields = {
		name : "tên",
		tel : "sdt",
		startPlace: "điểm đón khách",
		endPlace: "trả khách",
		date: "ngày đón khách",
		time: "giờ đón khách",
		carType: "loại xe",
		directionType: "chiều di chuyển",
	}
	//console.log(appData);
	for(let key in visibleFields) {
		//console.log(key, visibleFields[key]);
		if(!appData[key]) {
			document.querySelector("#alert").innerHTML = "<p>Xin hãy điền "+visibleFields[key]+"</p>";
			document.querySelector("#"+key).focus();
			return false;
		}
	}
	const hiddenFields = {
		distance: 'quãng đường',
		travelTime: 'thời gian đi',
		price: 'giá tiền',
	}
	for(let key in hiddenFields) {
		if(!appData[key]) {
			document.querySelector("#alert").innerHTML = "<p>Không tính được "+hiddenFields[key]+". Xin hãy reload lại trang</p>";
			return false;
		}
	}
	return true;
}



//var patt = new RegExp("e", "g");
//var res = patt.test(str);