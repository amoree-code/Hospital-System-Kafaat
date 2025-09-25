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
import LoadingScreen from "@/components/LoadingScreen";

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

  if (loading) return <LoadingScreen />;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;
  if (!room) return null;

  const items = room.items?.slice().reverse();

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* بطاقة الغرفة */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              المسؤولة عن الغرف : {room.managerName}
              {room.floor?.floorNumber}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              رقم الغرفة : {room.name} - اسم الغرفة : {room.roomNumber}
            </CardDescription>
            <CardDescription className="text-center  *text-gray-600">
              {room.note || "بدون ملاحظات"}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* العناصر التابعة للغرفة */}
        <h2 className="text-xl font-semibold text-center">العناصر</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between min-h-[280px] w-full bg-gray-50 shadow-md hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {item.name}
                </CardTitle>
                <CardDescription>النوع: {item.type}</CardDescription>
                <CardDescription>الكمية: {item.quantity}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-2">
                <p>
                  <strong>السعر:</strong> {item.price} د.ع
                </p>
                <p>
                  <strong>ملاحظة :</strong> {item.note || "بدون ملاحظات"}
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
                {/* <Button size="sm" className="w-full">
                  عرض التفاصيل
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QrItems;
