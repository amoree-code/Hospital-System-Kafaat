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
import { Textarea } from "../ui/textarea";
import { useAxios } from "@/hooks/useAxios";

export default function UpdateItems({ item, refetch }) {
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (item) {
      setFormData({
        roomId: item.roomId || "",
        name: item.name || "",
        qrCode: item.qrCode || "",
        quantity: item.quantity || 0,
        type: item.type || "",
        price: item.price || 0,
        imgUrl: item.imgUrl || "",
        note: item.note || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/item/${item.id}`, formData);
      if (refetch) refetch();
      setOpen(false);
    } catch (error) {
      console.error("❌ Failed to update item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Input
              id="name"
              placeholder="أدخل اسم العنصر"
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
              placeholder="أدخل نوع العنصر"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">العدد</Label>
            <Input
              id="quantity"
              name="quantity"
              placeholder="أدخل العدد"
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
              placeholder="أدخل السعر"
              type="number"
              value={formData.price}
              onChange={handleChange}
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
              <Button variant="secondary">إلغاء</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
