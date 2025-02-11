import axiosClient from "./axiosClient";

export const authAPI = {
  login: (email: string, password: string) => {
    return axiosClient.post(`/auth/login`, {email, password});
  },

  getUser:() => {
    return axiosClient.get("/auth/me");

  },

};
