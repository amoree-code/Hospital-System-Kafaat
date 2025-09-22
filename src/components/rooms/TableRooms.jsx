import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteRooms from "./DeleteRooms";
import UpdateRooms from "./UpdateRooms";
import AttachmentsRooms from "./AttachmentsRooms";

function TableRooms({ data, refetch }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            رقم الغرفة
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            اسم الغرفة
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            اسم المدير
          </TableHead>
          {/* <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            الملاحظات
          </TableHead> */}
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            عدد الأسرة
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            الإجراءات
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.items?.map((room) => (
          <TableRow key={room.id} className="border-b">
            <TableCell className="px-6 py-4 text-center font-medium">
              {room.roomNumber}
            </TableCell>
            <TableCell className="px-6 py-4 text-center font-medium">
              {room.name}
            </TableCell>
            <TableCell className="px-6 py-4 text-center">
              {room.managerName}
            </TableCell>
            {/* <TableCell className="px-6 py-4 text-center">
              {room.note || "-"}
            </TableCell> */}
            <TableCell className="px-6 py-4 text-center">
              {room.numberOfBeds}
            </TableCell>
            <TableCell className="px-6 py-4 text-center">
              <div className="flex justify-center items-center gap-2">
                <UpdateRooms room={room} refetch={refetch} />
                <DeleteRooms id={room.id} refetch={refetch} />
                <AttachmentsRooms id={room.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableRooms;
