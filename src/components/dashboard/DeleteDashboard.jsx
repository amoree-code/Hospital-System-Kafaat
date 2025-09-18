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
import { Trash2 } from "lucide-react";

export default function DeleteDashboard() {
  const handleDelete = () => {
    console.log("تم حذف المستخدم:");
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
            {/* هل أنت متأكد من حذف المستخدم /"{userName}"؟ هذا الإجراء لا يمكن
            التراجع عنه. */}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
