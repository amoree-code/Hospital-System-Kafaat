import axios from "axios";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: "https://alkafaathospitalapi.bitxero-iq.com",
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
