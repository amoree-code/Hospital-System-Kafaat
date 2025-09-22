import React, { useState } from "react";
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
import { useAxios } from "@/hooks/useAxios";

export default function Updatedflooers({ floor, refetch }) {
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    floorNumber: floor.floorNumber,
    floorName: floor.floorName,
    floorDescription: floor.floorDescription,
    notes: floor.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/floor/${floor.id}`, formData);
      refetch();
      setOpen(false);
    } catch (error) {
      console.error("❌ فشل تحديث الطابق:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
          <Edit size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تحديث بيانات الطابق</DialogTitle>
          <DialogDescription>
            يمكنك تعديل بيانات الطابق ثم الضغط على زر حفظ.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="floorNumber">رقم الطابق</Label>
            <Input
              id="floorNumber"
              name="floorNumber"
              type="number"
              value={formData.floorNumber}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="floorName">اسم الطابق</Label>
            <Input
              id="floorName"
              name="floorName"
              value={formData.floorName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="floorDescription">وصف الطابق</Label>
            <Input
              id="floorDescription"
              name="floorDescription"
              value={formData.floorDescription}
              onChange={handleChange}
            />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="notes">الملاحظات</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                إلغاء
              </Button>
            </DialogClose>
            <Button type="submit">حفظ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
