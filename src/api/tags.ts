import axiosClient from "./axiosClient";

export const tagAPI = {
  showTag: ()=> {
    return axiosClient.get(`/tags`);
  }
};
