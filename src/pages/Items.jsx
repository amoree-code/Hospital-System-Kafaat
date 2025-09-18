import React from "react";
import { Edit, Trash2, Paperclip, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddIetms from "@/components/items/AddIetms";
import DeleteItems from "@/components/items/DeleteItems";
import UpdateItems from "@/components/items/UpdateItems";
import AttachmentsItems from "@/components/items/AttachmentsItems";

export default function Items() {
  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة العناصر</h1>
        <AddIetms />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                التسلسل
              </TableHead>

              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                اسم العنصر
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                النوع
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                العدد
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                السعر
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                الملاحظات
              </TableHead>

              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b">
              <TableCell className="px-6 py-4 text-center font-medium">
                1
              </TableCell>
              <TableCell className="px-6 py-4 text-center font-medium">
                جهاز تنفس
              </TableCell>
              <TableCell className="px-6 py-4 text-center">
                معدات طبية
              </TableCell>
              <TableCell className="px-6 py-4 text-center">3</TableCell>
              <TableCell className="px-6 py-4 text-center">1000</TableCell>

              <TableCell className="px-6 py-4 text-center"> لا توجد </TableCell>
              <TableCell className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <UpdateItems />
                  <DeleteItems />
                  <AttachmentsItems />
                  {/* <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                    <Paperclip size={18} />
                  </button> */}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
