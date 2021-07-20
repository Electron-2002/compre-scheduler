const letterMap = {
	M: 1,
	T: 2,
	W: 3,
	H: 4,
	F: 5,
	S: 6,
	u: 7,
};

export const compareFn = (a, b) => {
	if (a.courses?.length > 0 && b.courses?.length > 0) {
		let a1 = a.slot;
		let b1 = b.slot;

		const aDay = a1.substr(0, 2) === 'TH' ? 4 : letterMap[a1[0]];
		const bDay = b1.substr(0, 2) === 'TH' ? 4 : letterMap[b1[0]];

		if (aDay < bDay) {
			return -1;
		}
		if (aDay > bDay) {
			return 1;
		}

		a1 = a1.substr(a1.length - 2, 2);
		b1 = b1.substr(b1.length - 2, 2);

		const aNum = a1[0] === '1' ? +a1 : +a1[1];
		const bNum = b1[0] === '1' ? +b1 : +b1[1];

		if (aNum < bNum) {
			return -1;
		}
		if (aNum > bNum) {
			return 1;
		}
	}
	return 0;
};
