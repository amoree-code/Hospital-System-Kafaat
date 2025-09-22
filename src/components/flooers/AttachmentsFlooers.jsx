import { Paperclip, X, Download, Share2 } from "lucide-react";
import React, { useState, useRef } from "react";

function AttachmentsFlooers({ id }) {
  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);

  // Use absolute URL for better compatibility
  const qrValue = `https://hospital-system-kafaat.vercel.app/flooers/${id}`;

  // Function to generate QR code as canvas and convert to image
  const generateQRCode = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 256; // Larger size for better mobile scanning

    canvas.width = size;
    canvas.height = size;

    // Fill white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);

    // Create QR code pattern (simplified - you'd want to use a proper QR library)
    // For now, we'll use a div-based approach with better mobile optimization
    return null;
  };

  const downloadQR = () => {
    // Create a canvas version for download
    const svg = qrRef.current.querySelector("svg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 512; // High resolution for download

    canvas.width = size;
    canvas.height = size;

    // Convert SVG to canvas (simplified approach)
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);

      // Download the image
      const link = document.createElement("a");
      link.download = `qr-code-${id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QR Code",
          text: "Scan this QR code",
          url: qrValue,
        });
      } catch (error) {
        console.log("Sharing failed:", error);
        // Fallback to copying URL
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue).then(() => {
      alert("رابط تم نسخه إلى الحافظة");
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:text-blue-600 touch-manipulation"
        title="إنشاء QR Code"
      >
        <Paperclip size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">QR Code</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-500 transition touch-manipulation p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* QR Code Container */}
            <div className="p-6 flex flex-col items-center">
              <div
                ref={qrRef}
                className="bg-white p-4 rounded-lg shadow-inner border-2 border-gray-100"
                style={{
                  minHeight: "280px",
                  minWidth: "280px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Simple QR-like pattern for demo - replace with actual QR library */}
                <div className="grid grid-cols-8 gap-1 w-64 h-64">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        Math.random() > 0.5 ? "bg-black" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* URL Display */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg w-full">
                <p className="text-sm text-gray-600 text-center break-all">
                  {qrValue}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 w-full">
                <button
                  onClick={shareQR}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition touch-manipulation"
                >
                  <Share2 size={16} />
                  مشاركة
                </button>
                <button
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition touch-manipulation"
                >
                  <Download size={16} />
                  تحميل
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>امسح الكود باستخدام كاميرا الهاتف</p>
                <p className="mt-1">أو أي تطبيق قارئ QR</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AttachmentsFlooers;
