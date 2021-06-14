import backend from '../../backend';
import { dayIndex } from '../../utils/days';
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
		const result = await backend.get('/schedule/5f9aa9dc51c33560c0666e2e/T4');
		const { schedule, blocks } = result.data[0];

		const days = schedule.days;

		let dates = [];
		const rows = [
			{ name: 'Slot 1', data: [] },
			{ name: 'Slot 2', data: [] },
		];

		days.forEach((day) => {
			const newDate = new Date(day.date);
			const formattedDate = newDate.getDate() + '/' + newDate.getMonth() + ' ' + dayIndex[newDate.getDay()];

			const dateString = day.date;
			const dateObj = {
				formattedDate,
				dateString,
			};

			dates = [...dates, dateObj];
			rows[0].data = [...rows[0].data, day.an];
			rows[1].data = [...rows[1].data, day.fn];
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

export const deleteBlock = (name) => async (dispatch, getState) => {
	const blocks = getState().table.blocks;
	console.log(blocks);
	let newBlocks = blocks;

	blocks.forEach((data, i) => {
		data.courses.forEach((course, j) => {
			if (course.name === name) {
				const modCourses = blocks[i].courses.filter((_, index) => {
					return index !== j;
				});

				newBlocks = blocks;
				newBlocks[i] = { courses: modCourses };

				dispatch({ type: DELETE_BLOCK, payload: newBlocks });
			}
		});
	});
};

export const addToTarget = (course, row, col) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	let newBlocks = [];

	if (blocks.length === 0) newBlocks = [{ courses: [course] }];

	blocks.forEach((data, i) => {
		if (data.courses && data.courses[0]?.slot === course.slot) {
			const modBlocks = blocks.filter((el, index) => {
				return index !== i;
			});

			const modCourses = [...blocks[i].courses, course];
			newBlocks = [...modBlocks, { courses: modCourses }];
		} else if (i === blocks.length - 1) {
			newBlocks = [...blocks, { courses: [course] }];
		}
	});

	let newRows = [...rows];
	newRows[row].data[col] = newBlocks;

	dispatch({ type: ADD_TO_TARGET, payload: newRows });
};

export const deleteFromTarget = (name, row, col) => async (dispatch, getState) => {
	const rows = getState().table.rows;

	const blocks = rows[row].data[col];
	let newBlocks = [];

	blocks.forEach((data, i) => {
		data.courses &&
			data.courses.forEach((course, j) => {
				if (course.name === name) {
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
				if (data.name === course.name) {
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
				if (data.name === course.name) {
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
				if (data.name === course.name) {
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
