import React from "react";
import AddUsers from "@/components/users/AddUsers";
import TableUsers from "@/components/users/TableUsers";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/LoadingScreen";

export default function Users() {
  const axios = useAxios();

  const fetchUsers = async () => {
    const result = await axios.get("/api/auth/get-all-users");
    return result.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <LoadingScreen />;
  if (error) return <p className="text-red-500">فشل تحميل المستخدمين</p>;
  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <AddUsers refetch={refetch} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <TableUsers data={data} refetch={refetch} />
      </div>
    </div>
  );
}
