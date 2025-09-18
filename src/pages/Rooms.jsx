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

export default function Rooms() {
  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة الغرف</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          إضافة غرفة جديدة
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                رقم الغرفة
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                الطابق
              </TableHead>

              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                عدد الأسرة
              </TableHead>

              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                ملاحظات
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
                الطابق الثاني
              </TableCell>

              <TableCell className="px-6 py-4 text-center">3</TableCell>

              <TableCell className="px-6 py-4 text-center"> لا توجد </TableCell>
              <TableCell className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                    <Paperclip size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
