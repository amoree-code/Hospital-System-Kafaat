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
import FloorSelect from "@/components/rooms/FloorSelect";

export default function AddRooms({ refetch }) {
  const axios = useAxios();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    floorId: "",
    name: "",
    roomNumber: "",
    managerName: "",
    note: "",
    numberOfBeds: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/room", formData);
      setFormData({
        floorId: "",
        name: "",
        roomNumber: "",
        managerName: "",
        note: "",
        numberOfBeds: 0,
      });
      setOpen(false);
      if (refetch) refetch();
    } catch (error) {
      console.error("❌ Error adding room:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          إضافة غرفة جديدة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة غرفة جديدة</DialogTitle>
          <DialogDescription>
            يرجى إدخال بيانات الغرفة الجديدة ثم الضغط على زر إضافة.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAdd} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="floorId">اختر الطابق</Label>
            <FloorSelect
              value={formData.floorId}
              onChange={(id) =>
                setFormData((prev) => ({ ...prev, floorId: id }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="roomNumber">رقم الغرفة</Label>
            <Input
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">اسم الغرفة</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="managerName">اسم المدير</Label>
            <Input
              id="managerName"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
            />
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="note">ملاحظات</Label>
            <Input
              id="note"
              name="note"
              value={formData.note ?? "-"}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="grid gap-2">
            <Label htmlFor="numberOfBeds">عدد الأسرة</Label>
            <Input
              id="numberOfBeds"
              name="numberOfBeds"
              type="number"
              value={formData.numberOfBeds}
              onChange={handleChange}
              min={0}
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
