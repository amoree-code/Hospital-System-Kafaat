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

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* معلومات الطابق */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">{floor.floorName}</CardTitle>
            <CardDescription className="text-center">
              {floor.floorDescription} — رقم الطابق: {floor.floorNumber}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* الغرف */}
        <h2 className="text-xl font-semibold text-center">الغرف</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {floor.rooms?.map((room) => (
            <Card key={room.id} className="w-72 bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
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
