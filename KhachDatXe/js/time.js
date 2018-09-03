let now = new Date(),
	nextMonth = new Date(now.getFullYear(), now.getMonth()+1, 1),
	nextYear = new Date(now.getFullYear()+1, now.getMonth(), 1),
	currentTime= {
		hour : now.getHours() ,
		minute: now.getMinutes()
	},
	pad = function(num) {
		return ('0' + num).slice(-2)
	};
$(document).ready(function(){
	$('#date').datepicker({
		autoClose: true,
		setDefaultDate: true,
		defaultDate: now,
		format: 'dd mmm, yyyy',
		firstDay: 1,
		minDate	: now,
		maxDate: nextMonth,
		yearRange: [now.getFullYear(), nextYear.getFullYear()],
		i18n: {
			cancel: "Đóng",
			clear: "Xóa",
			done: "Chọn",
			months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
			monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
			weekdays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
			weekdaysShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
			weekdaysAbbrev: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
		},
		onSelect: function (date) {
			appData.date = date;
			calculatePostage();
		}
	});
	$('#time').val(pad(currentTime.hour)+":"+pad(currentTime.minute));
	$('#time').timepicker({
		defaultTime: 'now',
		fromNow: 0,
		autoClose: true,
		twelveHour: false,
		i18n: {
			cancel: "Đóng",
			clear: "Xóa",
			done: "Chọn",
		},
		onSelect: function(hour, minute) {
			appData.time = {
				hour: hour, 
				minute: minute
			}
			calculatePostage();
		}
	});
});