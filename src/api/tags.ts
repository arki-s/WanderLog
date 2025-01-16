import axiosClient from "./axiosClient";

export const tagAPI = {
  showTag: ()=> {
    return axiosClient.get(`/tags`);
  },
  createTag: (userId: number, name: string) => {
    return axiosClient.post(`/tags`, {userId, name});
  }

};
