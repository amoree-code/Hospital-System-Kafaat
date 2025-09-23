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
import { useFetchRooms } from "@/hooks/useFetchRooms";

export default function RoomSelect({ value, onChange }) {
  const { fetchRooms } = useFetchRooms();

  const { data: rooms = [], isError } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  if (isError) return <p>Failed to load rooms.</p>;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="اختر الغرفة" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {rooms.map((room) => (
            <SelectItem key={room.id} value={room.id}>
              {room.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
