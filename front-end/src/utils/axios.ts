import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const getBaseUrl = (type: string) => {
  if (type === 'HOST_BASE_URL') {
    return HOST_API;
  }
  return HOST_API;
}

export enum BaseUrlTypes {
  ENUM_HOST_BASE_URI = 'HOST_BASE_URL'
}

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/signup',
  },
};
