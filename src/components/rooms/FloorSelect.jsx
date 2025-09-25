import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useFetchFloors } from "@/hooks/useFetchFloors";

export default function FloorSelect({ value, onChange }) {
  const { fetchFloors } = useFetchFloors();

  const { data: floors = [], isError } = useQuery({
    queryKey: ["floors"],
    queryFn: fetchFloors,
  });

  if (isError) return <p>Failed to load floors.</p>;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="اختر الطابق" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {floors?.data?.items.map((floor) => (
            <SelectItem key={floor.id} value={floor.id}>
              {floor.floorName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
