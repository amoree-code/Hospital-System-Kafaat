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
import { Edit, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

export default function UpdateItems({
  item = {
    name: "جهاز تنفس",
    type: "معدات طبية",
    note: "",
    price: 1000,
  },
}) {
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("تم تحديث العنصر:", item);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
          <Edit size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]" style={{ direction: "rtl" }}>
        <DialogHeader>
          <DialogTitle>تحديث بيانات العنصر</DialogTitle>
          <DialogDescription>
            يمكنك تعديل بيانات العنصر ثم الضغط على زر حفظ.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="name">اسم العنصر</Label>
            <Input id="name" name="name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">نوع العنصر</Label>
            <Input id="type" name="type" />
          </div>

          <div className="grid gap-2 ">
            <Label htmlFor="role"> العدد</Label>
            <Input id="role" name="role" type="number" required />
          </div>

          <div className="grid gap-2 ">
            <Label htmlFor="price"> السعر </Label>
            <Input id="price" name="price" type="number" />
          </div>

          <div className="grid gap-2 ">
            <Label htmlFor="note">الملاحظات</Label>
            <Textarea id="note" name="note" defaultValue={item.note} />
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
