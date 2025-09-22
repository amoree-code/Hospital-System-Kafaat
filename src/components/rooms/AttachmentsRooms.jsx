import { Paperclip, X } from "lucide-react";
import React, { useState } from "react";
import QRCode from "react-qr-code";

function AttachmentsRooms({ id }) {
  const [open, setOpen] = useState(false);

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
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">QR Code</h2>
            <QRCode value={`http://localhost:3000/rooms/${id}`} />
          </div>
        </div>
      )}
    </>
  );
}

export default AttachmentsRooms;
