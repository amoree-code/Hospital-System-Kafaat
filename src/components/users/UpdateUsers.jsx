// import { Edit } from "lucide-react";
// import React from "react";

// export default function UpdateUsers() {
//   return (
//     <div>
//       <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
//         <Edit size={18} />
//       </button>
//     </div>
//   );
// }

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateUsers() {
  const handleUpdate = (e) => {
    e.preventDefault();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
          <Edit size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تحديث بيانات المستخدم</DialogTitle>
          <DialogDescription>
            يمكنك تعديل بيانات المستخدم ثم الضغط على زر حفظ.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="name">الاسم</Label>
            <Input id="name" name="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" name="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">الدور</Label>
            {/* <Input id="role" name="role" defaultValue={user.role} /> */}
            <Input id="role" name="role" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                إلغاء
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              حفظ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
