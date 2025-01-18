import axiosClient from "./axiosClient";

export const tagAPI = {
  showTag: ()=> {
    return axiosClient.get(`/tags`);
  },
  createTag: (userId: number, name: string) => {
    return axiosClient.post(`/tags`, {userId, name});
  },
  updateTag: (userId: number, tagId: number, name: string) => {
    return axiosClient.put(`/tags/${tagId}`, {userId, tagId, name});
  },
  deleteTag: (userId: number, tagId: number) => {
    return axiosClient.delete(`/tags/${tagId}`, {params: {userId}});
  }
};
