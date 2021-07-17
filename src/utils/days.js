export const dayIndex = ['MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

export const getDatesArray = (startDate, endDate) => {
	const arr = [];

	let tempDate = new Date(startDate);
	for (; tempDate <= new Date(endDate); tempDate.setDate(tempDate.getDate() + 1)) {
		arr.push(new Date(tempDate));
	}

	return arr;
};

export const formatDate = (date) => {
	return date.getDate() + '/' + date.getMonth() + ' ' + dayIndex[date.getDay()];
};

export const changeDateFormat = (date) => {
	return date.toISOString().substr(0, 10) + ' ' + '00:00:00';
};
