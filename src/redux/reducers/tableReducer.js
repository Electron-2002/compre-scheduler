export const FETCH_DATA = 'FETCH_DATA';
export const ADD_BLOCK = 'ADD_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const DELETE_FROM_TARGET = 'DELETE_FROM_TARGET';
export const ADD_TO_TARGET = 'ADD_TO_TARGET';
export const ALLOT_INVIGILATOR = 'ALLOT_INVIGILATOR';
export const UNALLOT_INVIGILATOR = 'UNALLOT_INVIGILATOR';
export const UPDATE_INVIGILATOR = 'UPDATE_INVIGILATOR';

const initialState = {
	blocks: [],
	dates: [],
	rows: [],
	invigilators: [],
	rooms: [],
};

const tableReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case FETCH_DATA:
			return {
				...state,
				blocks: payload.blocks,
				dates: payload.dates,
				rows: payload.rows,
				invigilators: payload.invigilators,
				rooms: payload.rooms,
			};

		case ADD_BLOCK:
		case DELETE_BLOCK:
			return {
				...state,
				blocks: payload,
			};

		case ADD_TO_TARGET:
		case DELETE_FROM_TARGET:
		case ALLOT_INVIGILATOR:
		case UNALLOT_INVIGILATOR:
		case UPDATE_INVIGILATOR:
			return {
				...state,
				rows: payload,
			};

		default:
			return state;
	}
};

export default tableReducer;
