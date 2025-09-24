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

function QrRooms() {
  const { id } = useParams();
  const [floor, setFloor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axios
      .get(`https://alkafaathospitalapi.bitxero-iq.com/api/floor/${id}`)
      .then((res) => {
        setFloor(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("فشل تحميل بيانات الطابق");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4 text-center">جاري التحميل...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;
  if (!floor) return null;

  // ترتيب الغرف بحيث أحدث غرفة تظهر أولًا
  const rooms = floor.rooms?.slice().reverse();

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* معلومات الطابق */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {floor.floorName}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {floor.floorDescription} — رقم الطابق: {floor.floorNumber}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* الغرف */}
        <h2 className="text-xl font-semibold text-center mt-4 mb-2">الغرف</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms?.map((room) => (
            <Card
              key={room.id}
              className="flex flex-col justify-between min-h-[200px] w-full bg-gray-50 shadow-md hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {room.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-1">
                <p>
                  <strong>المدير:</strong> {room.managerName}
                </p>
                <p>
                  <strong>عدد الأسرة:</strong> {room.numberOfBeds}
                </p>
                <p>
                  <strong>ملاحظة:</strong> {room.note || "-"}
                </p>
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

export default QrRooms;
