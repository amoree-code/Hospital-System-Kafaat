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
import { useAxios } from "@/hooks/useAxios";
import { Trash2 } from "lucide-react";

export default function DeleteUsers({ userId, refetch }) {
  const axios = useAxios();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/auth/${userId}`);
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
          <Trash2 size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من حذف المستخدم؟ هذا الإجراء لا يمكن التراجع عنه.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
          <Button onClick={handleDelete}>حذف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
