import backend from '../../backend';
import { dayIndex, getDatesArray } from '../../utils/days';
import {
	ADD_BLOCK,
	ADD_TO_TARGET,
	ALLOT_INVIGILATOR,
	DELETE_BLOCK,
	DELETE_FROM_TARGET,
	FETCH_DATA,
	UNALLOT_INVIGILATOR,
	UPDATE_INVIGILATOR,
} from '../reducers/tableReducer';

export const fetchData = () => async (dispatch) => {
	try {
		const result = await backend.get('/schedule/1');
		const { schedule, exams } = result.data;

		const days = getDatesArray(schedule.start_date, schedule.end_date);

		let rows = [];
		for (let i = 0; i < schedule.slots_each_day; ++i) {
			rows.push({ name: `Slot ${i + 1}`, data: [] });
		}

		const dates = days.map((day) => ({
			formatted: day.getDate() + '/' + day.getMonth() + ' ' + dayIndex[day.getDay()],
			exact: day,
		}));

		// days.forEach((day) => {
		// 	rows[0].data = [...rows[0].data, day.an];
		// 	rows[1].data = [...rows[1].data, day.fn];
		// });

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

		rows[0].data.push([{ courses: [exams[0].course] }, { courses: [exams[0].course] }]);
		rows[1].data.push([]);

		exams.forEach((exam) => {
			for (let i = 0; i < blocks.length; ++i) {
				if (blocks[i].slot === exam.course.block) {
					blocks[i].courses.push(exam.course);
				}
			}
		});

		dispatch({
			type: FETCH_DATA,
			payload: {
				blocks,
				dates,
				rows,
			},
		});
	} catch (e) {
		console.log(e);
	}
};

export const addBlock = (course) => async (dispatch, getState) => {
	const blocks = getState().table.blocks;
	let newBlocks = [];

	blocks.forEach((data, i) => {
		if (data.courses[0]?.slot === course.slot) {
			const modBlocks = blocks.filter((_, index) => {
				return index !== i;
			});

			const modCourses = [...blocks[i].courses, course];
			newBlocks = [...modBlocks, { courses: modCourses }];
		} else if (i === blocks.length - 1) {
			newBlocks = [...blocks, { courses: [course] }];
		}
	});

	dispatch({ type: ADD_BLOCK, payload: newBlocks });
};

export const deleteBlock = (id) => async (dispatch, getState) => {
	const blocks = getState().table.blocks;

	let newBlocks = blocks;

	blocks.forEach((data, i) => {
		data.courses.forEach((course, j) => {
			if (course._id === id) {
				const modCourses = blocks[i].courses.filter((_, index) => {
					return index !== j;
				});

				newBlocks[i] = { courses: modCourses };
			}
		});
	});

	dispatch({ type: DELETE_BLOCK, payload: newBlocks });
};

export const addToTarget = (course, row, col) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	let newBlocks = [];

	if (blocks.length === 0) newBlocks = [{ courses: [course] }];

	let flag = false;
	blocks.forEach((data, i) => {
		if (data.courses && data.courses[0]?.slot === course.slot) {
			newBlocks = [...blocks];

			const modCourses = [...blocks[i].courses, course];
			newBlocks[i] = { courses: modCourses };

			flag = true;
		}
	});

	if (!flag) {
		newBlocks = [...blocks, { courses: [course] }];
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
			data.courses.forEach((course, j) => {
				if (course._id === id) {
					const modBlocks = blocks.filter((_, index) => {
						return index !== i;
					});
					const modCourses = blocks[i].courses.filter((_, index) => {
						return index !== j;
					});
					newBlocks = [...modBlocks, { courses: modCourses }];
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
		if (block.courses && block.courses[0]?.slot === data.slot) {
			block.courses.forEach((course, j) => {
				if (data._id === course._id) {
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
		if (block.courses && block.courses[0]?.slot === data.slot) {
			block.courses.forEach((course) => {
				if (data._id === course._id) {
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
		if (block.courses && block.courses[0]?.slot === data.slot) {
			block.courses.forEach((course) => {
				if (data._id === course._id) {
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
