import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './api';

const appAxios = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Utility: Redirect on known errors (except 401, which we now handle manually)
const handleErrorRedirect = (status: number) => {
  switch (status) {
    case 503:
      window.location.href = '/503';
      break;
    case 403:
      localStorage.clear();
      window.location.href = '/login';
      break;
    case 429:
      return;
    default:
      return;
  }
};

// Refresh token API call
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await axios.get(`${API_URL}/api/auth/admin/token-revalidate`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const newToken = response.data?.body?.data.accessToken;
    const newRefreshToken = response.data?.body?.data.refreshToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      return newToken;
    } else {
      throw new Error('Invalid refresh response');
    }
  } catch (err) {
    throw err;
  }
};

// Add token to request
appAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);
let refreshTokenPromise: Promise<string | null> | null = null;
// Response Interceptor
appAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;

    // 🔁 Try refresh token if 401 and request not retried yet
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshTokenPromise) {
          // Start refresh only once
          refreshTokenPromise = refreshAccessToken();
        }
        const newToken = await refreshTokenPromise;
        refreshTokenPromise = null;

        if (newToken) {
          // Update token and retry request
          if (originalRequest.headers?.set) {
            originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
          }
          return appAxios(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        // Refresh token failed → logout
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (status) {
      handleErrorRedirect(status);
    }

    return Promise.reject(error);
  },
);

export default appAxios;
