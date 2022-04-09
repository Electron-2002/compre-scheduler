export const dayIndex = ['SUN', 'MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT'];

export const getDatesArray = (startDate, endDate) => {
	const arr = [];

	let tempDate = new Date(startDate);
	for (; tempDate <= new Date(endDate); tempDate.setDate(tempDate.getDate() + 1)) {
		arr.push(new Date(tempDate));
	}

	return arr;
};

export const formatDate = (date) => {
	return date.getDate() + '/' + (date.getMonth() + 1) + ' ' + dayIndex[date.getDay()];
};

export const changeDateFormat = (date) => {
	return date.toISOString().substr(0, 10);
};

export const days_between = (date1, date2) => {
	const ONE_DAY = 1000 * 60 * 60 * 24;
	const differenceMs = Math.abs(new Date(date1) - new Date(date2));

	return Math.round(differenceMs / ONE_DAY);
};
