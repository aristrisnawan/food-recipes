import { CONFIG } from '@/constants/config';
import { getToken } from '@/utils/storage';
import axios from 'axios';

const api = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: CONFIG.TIMEOUT
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
});

export default api;