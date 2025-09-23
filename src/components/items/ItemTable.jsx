import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteItems from "@/components/items/DeleteItems";
import UpdateItems from "@/components/items/UpdateItems";

function ItemTable({ data, refetch }) {
  const role = localStorage.getItem("role");
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            اسم العنصر
          </TableHead>

          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            نوع العنصر
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            الكمية
          </TableHead>
          <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            السعر
          </TableHead>
          {/* <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
            الملاحظات
          </TableHead> */}

          {role === "SuperAdmin" && (
            <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
              الإجراءات
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.items?.map((item) => (
          <TableRow key={item.id} className="border-b">
            <TableCell className="px-6 py-4 text-center font-medium">
              {item.name}
            </TableCell>
            <TableCell className="px-6 py-4 text-center">{item.type}</TableCell>
            <TableCell className="px-6 py-4 text-center">
              {item.quantity}
            </TableCell>
            <TableCell className="px-6 py-4 text-center">
              {item.price}
            </TableCell>
            {/* <TableCell className="px-6 py-4 text-center">
              {item.note || "-"}
            </TableCell> */}
            {role === "SuperAdmin" && (
              <>
                <TableCell className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <UpdateItems item={item} refetch={refetch} />
                    <DeleteItems id={item.id} refetch={refetch} />
                  </div>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ItemTable;
