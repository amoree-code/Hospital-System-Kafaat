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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useAxios } from "@/hooks/useAxios";

export default function UpdateUsers({ user, refetch }) {
  const [open, setOpen] = React.useState(false);
  const axios = useAxios();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      staticRole: String(user?.staticRole ?? 0),
      phone: user?.phone || "",
      phoneCountryCode: user?.phoneCountryCode || "+964",
    },
  });

  const handleUpdate = async (data) => {
    try {
      const payload = {
        ...data,
        staticRole: Number(data.staticRole),
      };

      await axios.put(`/api/auth/${user.id}`, payload);

      refetch();

      reset();

      setOpen(false);
    } catch (error) {
      console.error("❌ Error updating user:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
          onClick={() =>
            reset({
              ...user,
              staticRole: String(user.staticRole ?? 0),
            })
          }
        >
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

        <form onSubmit={handleSubmit(handleUpdate)} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="name">الاسم</Label>
            <Input id="name" {...register("name", { required: true })} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="staticRole">نوع الحساب</Label>
            <Controller
              name="staticRole"
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

          <input type="hidden" {...register("phone")} />
          <input type="hidden" {...register("phoneCountryCode")} />

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
