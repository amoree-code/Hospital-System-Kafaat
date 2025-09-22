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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAxios } from "@/hooks/useAxios";

export default function AddFlooer({ refetch }) {
  const axios = useAxios();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    floorNumber: "",
    floorName: "",
    floorDescription: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/floor", formData);
      setFormData({
        floorNumber: "",
        floorName: "",
        floorDescription: "",
        notes: "",
      });
      setOpen(false);
      // تحديث الجدول
      if (refetch) refetch();
    } catch (error) {
      console.error("❌ Error adding floor:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          إضافة طابق جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة طابق جديد</DialogTitle>
          <DialogDescription>
            يرجى إدخال بيانات الطابق الجديد ثم الضغط على زر إضافة.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAdd} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="floorNumber">رقم الطابق</Label>
            <Input
              id="floorNumber"
              name="floorNumber"
              type="number"
              value={formData.floorNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="floorName">اسم الطابق</Label>
            <Input
              id="floorName"
              name="floorName"
              value={formData.floorName}
              onChange={handleChange}
              required
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
