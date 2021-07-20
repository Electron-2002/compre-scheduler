import backend from '../../backend';
import { changeDateFormat, days_between, formatDate, getDatesArray } from '../../utils/days';
import {
	ADD_BLOCK,
	ADD_TO_TARGET,
	ALLOT_INVIGILATOR,
	DELETE_BLOCK,
	DELETE_FROM_TARGET,
	FETCH_DATA,
	LOGOUT,
	UNALLOT_INVIGILATOR,
	UPDATE_INVIGILATOR,
} from '../reducers/tableReducer';
import { setLoading } from './loadActions';

export const fetchData = (scheduleId) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const result = await backend.post(`/schedule/${scheduleId}`);
		const { schedule, exams } = result.data;

		const days = getDatesArray(schedule.start_date, schedule.end_date);

		let rows = [];
		for (let i = 0; i < schedule.slots_each_day; ++i) {
			rows.push({ name: `Slot ${i + 1}`, data: [] });
		}

		const dates = days.map((day) => ({
			formatted: formatDate(day),
			exact: day,
		}));

		let blocks = [];
		exams.forEach((exam) => {
			let flag = false;
			for (let i = 0; i < blocks.length; ++i) {
				if (blocks[i].slot === exam.course.block) {
					flag = true;
				}
			}

			if (!flag) {
				blocks.push({ slot: exam.course.block, courses: [] });
			}
		});

		dates.forEach(() => {
			rows[0].data.push([]);
			rows[1].data.push([]);
		});

		exams.forEach((exam) => {
			for (let i = 0; i < blocks.length; ++i) {
				if (blocks[i].slot === exam.course.block) {
					if (exam.date != null) {
						const r = exam.time === '9-12' ? 0 : 1;
						const c = days_between(exam.date, schedule.start_date);

						let flag = false;
						rows[r].data[c].forEach((block, j) => {
							if (block.slot === exam.course.block) {
								rows[r].data[c][j].courses.push(exam);
								flag = true;
							}
						});

						if (!flag) {
							rows[r].data[c].push({ slot: exam.course.block, courses: [exam] });
						}
					} else {
						blocks[i].courses.push(exam);
					}
				}
			}
		});

		const courseList = exams.map((exam) => ({ id: exam.course.bits_id, name: exam.course.title }));

		const invigilators = await backend.post('/invigilator/getAll');
		const rooms = await backend.post('/room/getAll');

		dispatch({
			type: FETCH_DATA,
			payload: {
				id: scheduleId,
				blocks,
				dates,
				rows,
				invigilators: invigilators.data.invigilator,
				rooms: rooms.data.rooms,
				courseList,
			},
		});
		dispatch(setLoading(false));
	} catch (e) {
		console.log(e);
	}
};

export const addBlock = (exam) => async (dispatch, getState) => {
	const finalCourse = {
		...exam,
		date: null,
		time: null,
	};

	const blocks = getState().table.blocks;
	let newBlocks = [];

	let flag = false;
	blocks.forEach((data, i) => {
		if (data.slot === finalCourse.course.block) {
			newBlocks = [...blocks];

			const modCourses = [...blocks[i].courses, finalCourse];
			newBlocks[i] = { slot: data.slot, courses: modCourses };

			flag = true;
		}
	});

	if (!flag) {
		newBlocks = [...blocks, { slot: finalCourse.course.block, courses: [finalCourse] }];
	}

	dispatch({ type: ADD_BLOCK, payload: newBlocks });
};

export const deleteBlock = (id) => async (dispatch, getState) => {
	const blocks = getState().table.blocks;

	let newBlocks = [...blocks];

	blocks.forEach((data, i) => {
		data.courses.forEach(({ course }, j) => {
			if (course.id === id) {
				const modCourses = blocks[i].courses.filter((_, index) => {
					return index !== j;
				});

				if (modCourses.length > 0) {
					newBlocks[i] = { slot: data.slot, courses: modCourses };
				} else {
					newBlocks = blocks.filter((_, index) => {
						return index !== i;
					});
				}
			}
		});
	});

	dispatch({ type: DELETE_BLOCK, payload: newBlocks });
};

export const addToTarget = (exam, row, col) => async (dispatch, getState) => {
	const finalCourse = {
		...exam,
		date: changeDateFormat(getState().table.dates[col].exact),
		time: row === 0 ? '9-12' : '2-5',
	};

	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	let newBlocks = [];

	let flag = false;
	blocks.forEach((data, i) => {
		if (data.slot === finalCourse.course.block) {
			newBlocks = [...blocks];

			const modCourses = [...blocks[i].courses, finalCourse];
			newBlocks[i] = { slot: data.slot, courses: modCourses };

			flag = true;
		}
	});

	if (!flag) {
		console.log({ slot: finalCourse.course.block, courses: [finalCourse] });
		newBlocks = [...blocks, { slot: finalCourse.course.block, courses: [finalCourse] }];
	}

	let newRows = [...rows];
	newRows[row].data[col] = newBlocks;

	dispatch({ type: ADD_TO_TARGET, payload: newRows });
};

export const deleteFromTarget = (id, row, col) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	let newBlocks = [];

	blocks.forEach((data, i) => {
		data.courses &&
			data.courses.forEach(({ course }, j) => {
				if (course.id === id) {
					const modBlocks = blocks.filter((_, index) => {
						return index !== i;
					});
					const modCourses = blocks[i].courses.filter((_, index) => {
						return index !== j;
					});
					if (modCourses.length > 0) {
						newBlocks = [...modBlocks, { slot: data.slot, courses: modCourses }];
					} else {
						newBlocks = [...modBlocks];
					}
				}
			});
	});

	let newRows = [...rows];
	newRows[row].data[col] = newBlocks;

	dispatch({ type: DELETE_FROM_TARGET, payload: newRows });
};

export const allotInvigilator = (row, col, data, invigilator) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	const newBlocks = blocks;

	newBlocks.forEach((block, i) => {
		if (block.courses && block.courses[0]?.slot === data.courses[0].block) {
			block.courses.forEach(({ course }, j) => {
				if (data.id === course.id) {
					course.allotedInvigilators.push(invigilator);
				}
			});
		}
	});

	let newRows = [...rows];
	newRows[row].data[col] = newBlocks;

	dispatch({ type: ALLOT_INVIGILATOR, payload: newRows });
};

export const unAllotInvigilator = (row, col, data, index) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	const newBlocks = blocks;

	newBlocks.forEach((block) => {
		if (block.courses && block.courses[0]?.slot === data.courses[0].block) {
			block.courses.forEach(({ course }) => {
				if (data.id === course.id) {
					let newAllotedArray = course.allotedInvigilators;
					newAllotedArray.splice(index, 1);
					course.allotedInvigilators = newAllotedArray;
				}
			});
		}
	});

	let newRows = [...rows];
	newRows[row].data[col] = newBlocks;

	dispatch({ type: UNALLOT_INVIGILATOR, payload: newRows });
};

export const updateInvigilator = (row, col, data, index, invigilator) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	const newBlocks = blocks;

	newBlocks.forEach((block) => {
		if (block.courses && block.courses[0]?.slot === data.courses[0].block) {
			block.courses.forEach(({ course }) => {
				if (data.id === course.id) {
					let newAllotedArray = course.allotedInvigilators;
					newAllotedArray[index] = invigilator;
					course.allotedInvigilators = newAllotedArray;
				}
			});
		}
	});

	let newRows = [...rows];
	newRows[row].data[col] = newBlocks;

	dispatch({ type: UPDATE_INVIGILATOR, payload: newRows });
};

export const updateSchedule = () => async (dispatch, getState) => {
	const blocks = getState().table.blocks;
	const rows = getState().table.rows;

	let exams = [];

	rows.forEach((row) => {
		row.data.forEach((block) => {
			block.forEach((e) => {
				exams = [...exams, ...e.courses];
			});
		});
	});

	blocks.forEach((block) => {
		exams = [...exams, ...block.courses];
	});

	try {
		// const result = await backend.put(`/schedule/${getState().table.id}`, {
		// 	exams,
		// });
	} catch (e) {
		console.log(e);
	}
};

export const logout = () => (dispatch) => {
	sessionStorage.removeItem('isLogin');
	window.location.reload();
	dispatch({ type: LOGOUT });
};

export const output1 = () => (_, getState) => {
	window.open(`https://compre-scheduling.herokuapp.com/output/one/${getState().table.id}`);
};

export const output2 = () => (_, getState) => {
	window.open(`https://compre-scheduling.herokuapp.com/output/two/${getState().table.id}`);
};

export const output3 = (course) => (_, getState) => {
	console.log(course);
};

export const output4 = (inv) => (_, getState) => {
	console.log(inv);
};
