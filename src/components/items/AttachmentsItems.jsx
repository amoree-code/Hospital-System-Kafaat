import { Paperclip, Download, Printer, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function AttachmentsItems() {
  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const img = canvas.toDataURL("image/png");
      const originalContent = document.body.innerHTML;

      // عرض QR للطباعة مؤقتًا بنفس الصفحة
      document.body.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
          <h2 style="font-size:24px;margin-bottom:20px;">QR Code</h2>
          <img src="${img}" alt="QR Code" style="width:220px;height:220px;"/>
          <p style="margin-top:15px;font-size:14px;color:#555;">https://example.com</p>
        </div>
      `;

      window.print();

      // إعادة محتوى الصفحة بعد الطباعة
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl relative max-w-md w-full transform transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">
                QR Code Generator
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* QR Code Container */}
              <div className="flex justify-center mb-6">
                <div
                  ref={qrRef}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-inner"
                >
                  <QRCodeCanvas
                    value="https://example.com"
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#1f2937"
                    level="M"
                    includeMargin={true}
                  />
                </div>
              </div>

              {/* URL Display */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-2">الرابط المشفّر:</p>
                <div className="bg-gray-50 px-4 py-2 rounded-lg border">
                  <code className="text-sm text-blue-600 font-mono">
                    https://example.com
                  </code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Download size={18} />
                  تحميل
                </button>

                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Printer size={18} />
                  طباعة
                </button>
              </div>

              {/* Info Note */}
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-700 text-center">
                  💡 هذا مثال توضيحي - يمكنك تخصيص الرابط والمحتوى حسب احتياجاتك
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
