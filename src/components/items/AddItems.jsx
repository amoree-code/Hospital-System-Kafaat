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
import { Textarea } from "../ui/textarea";
import RoomSelect from "./RoomSelect";
import { useAxios } from "@/hooks/useAxios";

export default function AddItems({ refetch }) {
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomId: "",
    name: "",
    qrCode: "",
    quantity: 0,
    type: "",
    price: 0,
    imgUrl: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/item", formData);
      setFormData({
        roomId: "",
        name: "",
        qrCode: "",
        quantity: 0,
        type: "",
        price: 0,
        imgUrl: "",
        note: "",
      });
      setOpen(false);
      if (refetch) refetch();
    } catch (error) {
      console.error("❌ Failed to add item:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          إضافة عنصر جديد
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة عنصر جديد</DialogTitle>
          <DialogDescription>
            يرجى إدخال بيانات العنصر الجديد ثم الضغط على زر إضافة.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAdd} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="roomId">اختر الغرفة</Label>
            <RoomSelect
              value={formData.roomId}
              onChange={(id) =>
                setFormData((prev) => ({ ...prev, roomId: id }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">اسم العنصر</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">نوع العنصر</Label>
            <Input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imgUrl">صورة العنصر</Label>
            <Input
              id="imgUrl"
              name="imgUrl"
              type="file"
              value={formData.imgUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">العدد</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              name="price"
              type="text" // نصي للسماح بالفواصل
              value={formData.price.toLocaleString()}
              onChange={(e) => {
                // إزالة أي فواصل قبل التحديث
                const value = e.target.value.replace(/,/g, "");
                // تحديث state كرقم
                if (!isNaN(value)) {
                  setFormData((prev) => ({ ...prev, price: Number(value) }));
                }
              }}
              required
            />
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="note">الملاحظات</Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div> */}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                إلغاء
              </Button>
            </DialogClose>
            <Button type="submit">إضافة</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
