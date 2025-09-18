import axios from "axios";

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "",
  });

  return axiosInstance;
};
