import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertTriangle size={60} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          الصفحة غير موجودة
        </h2>
        <p className="text-gray-500 mb-6">
          يبدو أنك وصلت إلى رابط غير صحيح. الرجاء العودة إلى الصفحة الرئيسية.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
