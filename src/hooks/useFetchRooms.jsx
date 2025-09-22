import { useAxios } from "./useAxios";

export function useFetchRooms() {
  const axios = useAxios();

  const fetchRooms = async () => {
    const response = await axios.get("/api/room");
    return response.data.data.items;
  };

  return { fetchRooms };
}
