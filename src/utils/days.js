export const dayIndex = ['MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

export const getDatesArray = (startDate, endDate) => {
	const arr = [];

	let tempDate = new Date(startDate);
	for (; tempDate <= new Date(endDate); tempDate.setDate(tempDate.getDate() + 1)) {
		arr.push(new Date(tempDate));
	}

	return arr;
};
