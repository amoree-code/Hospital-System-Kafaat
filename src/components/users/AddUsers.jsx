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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAxios } from "@/hooks/useAxios";
import { useForm, Controller } from "react-hook-form";

export default function AddUsers({ refetch }) {
  const axios = useAxios();
  const [open, setOpen] = useState(false);

  const generatePhone = () => {
    const prefix = "07";
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}${randomDigits}`;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phoneCountryCode: "+964",
      phone: generatePhone(),
      password: "",
      name: "",
      role: 0,
    },
  });

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      setValue("phone", generatePhone());
    }
  };

  const handleAdd = async (data) => {
    try {
      const payload = { ...data, role: Number(data.role) };
      await axios.post("/api/auth/register", payload);
      reset();
      refetch();
      setOpen(false);
    } catch (error) {
      console.error("❌ Error adding user:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          إضافة مستخدم جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة مستخدم جديد</DialogTitle>
          <DialogDescription>
            يرجى إدخال بيانات المستخدم الجديد ثم الضغط على زر إضافة.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleAdd)} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="name">اسم المستخدم</Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && (
              <span className="text-red-500 text-sm">هذا الحقل مطلوب</span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">أدخل بريد صحيح</span>
            )}
          </div>

          <div className="grid gap-2">
            <Input
              type="hidden"
              id="phone"
              {...register("phone", { required: true })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">هذا الحقل مطلوب</span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">نوع الحساب</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر نوع الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">مدير النظام</SelectItem>
                      <SelectItem value="1">مشرف</SelectItem>
                      <SelectItem value="2">مدير قسم</SelectItem>
                      <SelectItem value="3">مستخدم</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

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
