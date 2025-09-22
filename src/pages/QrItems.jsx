import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function QrItems() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axios
      .get(`https://alkafaathospitalapi.bitxero-iq.com/api/room/${id}`)
      .then((res) => {
        setRoom(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("فشل تحميل بيانات الغرفة");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4 text-center">جاري التحميل...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;
  if (!room) return null;

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* بطاقة الغرفة */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">
              الغرفة: {room.name} (رقم {room.roomNumber})
            </CardTitle>
            <CardDescription className="text-center">
              عدد الأسرة: {room.numberOfBeds} — {room.note || "بدون ملاحظات"}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* العناصر التابعة للغرفة */}
        <h2 className="text-xl font-semibold text-center">العناصر</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {room.items?.map((item) => (
            <Card key={item.id} className="w-72 bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  النوع: {item.type} — الكمية: {item.quantity}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>السعر:</strong> {item.price} د.ع
                </p>
                <p>
                  <strong>ملاحظة:</strong> {item.note || "-"}
                </p>
                {item.imgUrl && (
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                )}
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">
                  عرض التفاصيل
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QrItems;
