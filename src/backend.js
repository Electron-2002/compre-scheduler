import axios from 'axios';

const backend = axios.create({
	baseURL: 'http://68.183.45.22:5005',
});

export default backend;
