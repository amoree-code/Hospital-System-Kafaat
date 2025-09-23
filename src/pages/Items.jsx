import React from "react";

import AddItems from "@/components/items/AddItems";

import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/LoadingScreen";
import ItemTable from "@/components/items/ItemTable";

export default function Items() {
  const role = localStorage.getItem("role");
  const axios = useAxios();

  const fetchItems = async () => {
    const response = await axios.get("/api/item");
    return response.data.data;
  };

  const {
    data: ItemsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة العناصر</h1>
        {role === "SuperAdmin" && <AddItems refetch={refetch} />}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <ItemTable data={ItemsData} refetch={refetch} />
      </div>
    </div>
  );
}
