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
import AddUsers from "@/components/users/AddUsers";
import UpdateUsers from "@/components/users/UpdateUsers";
import DeleteUsers from "@/components/users/DeleteUsers";

export default function Users() {
  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>

        <AddUsers />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                اسم المستخدم
              </TableHead>
              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                البريد الإلكتروني
              </TableHead>

              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                نوع الحساب
              </TableHead>

              <TableHead className="px-6 py-4 text-center font-medium text-gray-700">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b">
              <TableCell className="px-6 py-4 text-center font-medium">
                محمد علي
              </TableCell>
              <TableCell className="px-6 py-4 text-center">
                mohammad@example.com
              </TableCell>

              <TableCell className="px-6 py-4 text-center">مدير</TableCell>
              <TableCell className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2 items-center">
                  <UpdateUsers />
                  <DeleteUsers />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
