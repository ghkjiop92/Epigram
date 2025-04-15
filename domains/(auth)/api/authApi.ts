import axios from 'axios';

type CustomConfig = {
  token: string;
  type: string;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('tokenType');

    if (token && type) {
      config.headers = config.headers || {};
      config.headers['token'] = token;
      config.headers['type'] = type;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
