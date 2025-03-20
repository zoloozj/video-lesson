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
};

export enum BaseUrlTypes {
  ENUM_HOST_BASE_URI = 'HOST_BASE_URL',
}

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/signup',
    get_all_users: '/users',
    get_login_user: '/users/me',
    change__password: '/auth/change-password',
  },
  course: {
    get_all_course: '/course',
    get_course_by_id: (id: string) => `/course/${id}`,
    get_by_userEmail: '/course/user',
    create_course: '/course',
    edit_course: (id: number) => `/course/${id}`,
  },
  lesson: {
    get_lesson_by_courseID: (id: string) => `/lesson/course/${id}`,
    create_lesson: '/lesson',
    edit_lesson: (id: number) => `/lesson/${id}`,
  },
  comment: {
    get_comment_by_courseId: (id: number) => `/comment/course/${id}`,
    create_comment: `/comment`,
  },
};
