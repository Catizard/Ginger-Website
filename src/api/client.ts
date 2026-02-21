import axios from 'axios';

const instance = axios.create({ baseURL: '/api/v1/' });

instance.interceptors.response.use(res => res.data);

export default instance;
