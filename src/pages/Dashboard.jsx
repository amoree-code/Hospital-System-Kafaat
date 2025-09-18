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
import DeleteDashboard from "@/components/dashboard/DeleteDashboard";
import UpdatedDashboard from "@/components/dashboard/UpdatedDashboard";
import AttachmentsDashboard from "@/components/dashboard/AttachmentsDashboard";

const rooms = [
  { id: "r1", name: "غرفة العمليات" },
  { id: "r2", name: "غرفة الطوارئ" },
];

const items = [
  { id: "i1", name: "جهاز تنفس" },
  { id: "i2", name: "سرير طبي" },
];

const room_items = [
  { id: "ri1", room: "r1", items: "i1", qty: 2 },
  { id: "ri2", room: "r1", items: "i2", qty: 5 },
  { id: "ri3", room: "r2", items: "i2", qty: 3 },
];

export default function Dashboard() {
  const getRoomName = (roomId) =>
    rooms.find((r) => r.id === roomId)?.name || "-";
  const getItemName = (itemId) =>
    items.find((i) => i.id === itemId)?.name || "-";

  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-1">
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          إضافة جديد
        </button> */}
      </div>

      <h1 className="text-2xl font-bold mb-6">جدول ربط الغرف بالعناصر</h1>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                التسلسل
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                اسم الغرفة
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                اسم العنصر
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                الكمية
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {room_items.map((ri, idx) => (
              <TableRow key={ri.id} className="border-b">
                <TableCell className="px-6 py-4 text-center font-medium">
                  {idx + 1}
                </TableCell>
                <TableCell className="px-6 py-4 text-center font-medium">
                  {getRoomName(ri.room)}
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  {getItemName(ri.items)}
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  {ri.qty}
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <UpdatedDashboard />
                    <DeleteDashboard
                      userName={
                        getRoomName(ri.room) + " - " + getItemName(ri.items)
                      }
                    />
                    <AttachmentsDashboard />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
