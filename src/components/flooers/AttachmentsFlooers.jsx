import { Paperclip, X, Download, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";
import { AppConfig } from "@/config/config";
import { useNavigate } from "react-router-dom";

function AttachmentsFlooers({ id }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);

  const qrValue = `${AppConfig.baseUrl}/flooers/${id}`;

  const handleDownload = () => {
    const svg = qrRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `room-${id}-qrcode.png`;
      link.click();
    };

    img.src = url;
  };

  // طباعة QR داخل نفس الصفحة
  const handlePrint = () => {
    const printContent = qrRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    // استبدل محتوى الصفحة مؤقتًا بمحتوى QR
    document.body.innerHTML = `
    <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
      ${printContent}
    </div>
  `;

    window.print();

    // رجع الصفحة لحالتها الأصلية بعد الطباعة
    document.body.innerHTML = originalContent;
    window.location.reload(); // لإعادة تحميل React
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setOpen(false);
      return;
    }
  }, [token, navigate]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:text-blue-600"
        title="إنشاء QR Code"
      >
        <Paperclip size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-lg w-96">
            {/* زر إغلاق */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
              QR Code
            </h2>

            {/* QR Code */}
            <div ref={qrRef} className="flex justify-center mb-6">
              <QRCode value={qrValue} size={200} />
            </div>

            {/* الأزرار */}
            <div className="flex gap-3 justify-center">
              <Button onClick={handleDownload}>
                <Download size={18} />
                تحميل
              </Button>
              <Button onClick={handlePrint} variant="secondary">
                <Printer size={18} />
                طباعة
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AttachmentsFlooers;
