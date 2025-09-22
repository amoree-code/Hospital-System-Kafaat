import React from "react";
import AddRooms from "@/components/rooms/AddRooms";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import TableRooms from "@/components/rooms/TableRooms";
import LoadingScreen from "@/components/LoadingScreen";

export default function Rooms() {
  const axios = useAxios();

  const fetchRooms = async () => {
    const response = await axios.get("/api/room");
    return response.data.data;
  };

  const {
    data: roomsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة الغرف</h1>
        <AddRooms refetch={refetch} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <TableRooms data={roomsData} refetch={refetch} />
      </div>
    </div>
  );
}
