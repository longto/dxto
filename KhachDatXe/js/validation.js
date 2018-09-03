const mobileNumberHeader = [].concat.apply([], Object.values({
	Viettel : ['096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169', '086', '032', '033', '034', '035', '036', '037', '038', '039'],
	MobiFone : ['090', '093', '089', '0120', '0121', '0122', '0126', '0128', '070', '079', '077', '076', '078'],
	Vinaphone: ['091', '094', '0123', '0124', '0125', '0127', '0129', '088', '083', '084', '085', '081', '082'],
	Vietnamobile: ['092', '0188', '0186', '056', '058'],
	Gmobile : ['099', '0199', '059']
})).sort();
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
const hiddenFields = {
	distance: 'quãng đường',
	travelTime: 'thời gian đi',
	price: 'giá tiền',
}
function validateMobileNumber(mobileNumber) {
	mobileNumber = mobileNumber.replace(/\s/g, '').replace(/\+84/g, '0');
	if(!/[0-9]{10,11}/g.test(mobileNumber)) return false;
	return mobileNumberHeader.indexOf(mobileNumber.slice(0, -7)) > 0;
}
function validation() {
	document.querySelector("#alert").innerHTML = "";
	
	//console.log(appData);
	for(let key in visibleFields) {
		//console.log(key, visibleFields[key]);
		if(!appData[key]) {
			document.querySelector("#alert").innerHTML = "<p>Xin hãy điền "+visibleFields[key]+"</p>";
			document.querySelector("#"+key).focus();
			return false;
		}
		if (key==='tel' && !validateMobileNumber(appData[key])) {
			document.querySelector("#alert").innerHTML = "<p>VN không có số này.Xin hãy điền lại "+visibleFields[key]+"</p>";
			document.querySelector("#"+key).focus();
			return false;
		}
	}
	
	for(let key in hiddenFields) {
		if(!appData[key]) {
			document.querySelector("#alert").innerHTML = "<p>Lỗi ! Không tính được "+hiddenFields[key]+". Xin hãy reload lại trang</p>";
			return false;
		}
	}
	return true;
}