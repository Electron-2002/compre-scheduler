import axios from 'axios';

const backend = axios.create({
	baseURL: 'https://nameless-sea-65364.herokuapp.com',
});

export default backend;
