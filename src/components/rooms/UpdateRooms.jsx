import React, { useState, useEffect } from "react";
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
import FloorSelect from "./FloorSelect";

export default function UpdateRooms({ room, refetch }) {
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

  useEffect(() => {
    if (room) {
      setFormData({
        floorId: room.floorId || "",
        name: room.name || "",
        roomNumber: room.roomNumber || "",
        managerName: room.managerName || "",
        note: room.note || "",
        numberOfBeds: room.numberOfBeds || 0,
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/room/${room.id}`, formData);
      await refetch();
      setOpen(false);
    } catch (error) {
      console.error("❌ Failed to update room:", error);
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
          <DialogTitle>تحديث بيانات الغرفة</DialogTitle>
          <DialogDescription>
            يمكنك تعديل بيانات الغرفة ثم الضغط على زر حفظ.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="floorId">اختر الطابق</Label>
            <FloorSelect
              value={formData.floorId}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, floorId: value }))
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

          <div className="grid gap-2">
            <Label htmlFor="numberOfBeds">عدد الأسرة</Label>
            <Input
              id="numberOfBeds"
              name="numberOfBeds"
              type="number"
              value={formData.numberOfBeds}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">الملاحظات</Label>
            <Input
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

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
