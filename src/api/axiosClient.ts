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

axiosClient.interceptors.request.use((req)=>{
  const token = localStorage.getItem("authToken");

  if (token){
    req.headers.Authorization = `Bearer ${token}`;

  }

  return req;

}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
