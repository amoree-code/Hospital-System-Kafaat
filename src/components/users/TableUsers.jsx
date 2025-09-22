import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateUsers from "@/components/users/UpdateUsers";
import DeleteUsers from "@/components/users/DeleteUsers";

function TableUsers({ data, refetch }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
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
        {data?.data?.items?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="px-6 py-4 text-center">{user.name}</TableCell>
            <TableCell className="px-6 py-4 text-center">
              {user.email}
            </TableCell>
            <TableCell className="px-6 py-4 text-center">
              {user.staticRole === 0
                ? "Super Admin"
                : user.staticRole === 1
                ? "Admin"
                : "User"}
            </TableCell>
            <TableCell className="px-6 py-4 text-center flex justify-center gap-2">
              <UpdateUsers user={user} refetch={refetch} />
              <DeleteUsers userId={user.id} refetch={refetch} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableUsers;
