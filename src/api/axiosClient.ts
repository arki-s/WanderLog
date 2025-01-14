import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers:{
    'Content-Type': 'application/json',
  },

  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
