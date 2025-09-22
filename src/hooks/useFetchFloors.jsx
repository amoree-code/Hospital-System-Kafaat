import { useAxios } from "@/hooks/useAxios";

export function useFetchFloors() {
  const axios = useAxios();

  const fetchFloors = async () => {
    const response = await axios.get("/api/floor");
    return response.data;
  };

  return { fetchFloors };
}
