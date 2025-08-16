import axios from 'axios';

const api = axios.create({
	baseURL: "https://sagifriedchicken.vercel.app",
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('sfc_token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;






