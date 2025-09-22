import FlooersTable from "@/components/flooers/FlooersTable";
import AddFlooer from "@/components/flooers/AddFlooer";
import LoadingScreen from "@/components/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { useFetchFloors } from "@/hooks/useFetchFloors";

export default function Flooers() {
  const { fetchFloors } = useFetchFloors();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["floors"],
    queryFn: fetchFloors,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة الطوابق</h1>
        <AddFlooer refetch={refetch} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <FlooersTable data={data} refetch={refetch} />
      </div>
    </div>
  );
}
