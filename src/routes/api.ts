import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

let isRedirectedToLogin = false;

const route = axios.create({
    baseURL: `${(import.meta as any).env.VITE_API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

route.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

route.interceptors.response.use(
    (response) => response,
    (error) => {
        const res = error.response;
        if (res?.status === 401 || res?.data?.message === 'Unauthenticated') {
            enqueueSnackbar('Login Expired, Please Login Again!', {
                variant: 'error'
            });

            if (!isRedirectedToLogin && typeof window !== 'undefined') {
                isRedirectedToLogin = true;
                localStorage.removeItem('token');
                // localStorage.removeItem('is_auth');
                localStorage.removeItem('user');
                // window.location.href = '/login';
            }
        } else if (res?.status >= 500) {
            enqueueSnackbar('Server error, please try later.', {
                variant: 'error'
            });
        }

        return Promise.reject(error);
    }
);

// api route


const api = {
    route
};

export default api;
