import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Deleteflooers from "@/components/flooers/Deleteflooers";
import Updatedflooers from "@/components/flooers/Updatedflooers";
import Attachmentsflooers from "@/components/flooers/AttachmentsFlooers";

function FlooersTable({ data, refetch }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            رقم الطابق
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            اسم الطابق
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            وصف الطابق
          </TableHead>
          {/* <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            الملاحظات
          </TableHead> */}
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            الإجراءات
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data?.items?.map((floor) => (
          <TableRow key={floor.id} className="border-b">
            <TableCell className="px-6 py-4 text-center font-medium">
              {floor.floorNumber}
            </TableCell>
            <TableCell className="px-6 py-4 text-center font-medium">
              {floor.floorName}
            </TableCell>
            <TableCell className="px-6 py-4 text-center">
              {floor.floorDescription}
            </TableCell>
            {/* <TableCell className="px-6 py-4 text-center">
              {floor.notes || "-"}
            </TableCell> */}
            <TableCell className="px-6 py-4 text-center">
              <div className="flex justify-center items-center gap-2">
                <Updatedflooers floor={floor} refetch={refetch} />
                <Deleteflooers id={floor.id} refetch={refetch} />
                <Attachmentsflooers id={floor.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FlooersTable;
