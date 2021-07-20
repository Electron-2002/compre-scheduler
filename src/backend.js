import axios from 'axios';

const backend = axios.create({
	baseURL: 'https://compre-scheduling.herokuapp.com',
});

export default backend;
