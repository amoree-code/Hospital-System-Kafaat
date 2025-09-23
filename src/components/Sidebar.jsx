import React from "react";
import { LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getNavItems } from "@/routes/sidebar";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = getNavItems();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getActiveName = () => {
    if (location.pathname === "/") return "flooers";
    return location.pathname.slice(1);
  };

  const active = getActiveName();

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white relative shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          نظام مستشفى الكفاة
        </h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path}>
              <button
                className={`
                  w-full flex gap-3 items-center px-3 py-2 text-sm font-medium rounded-md transition
                  ${
                    active === item.name
                      ? "bg-red-100 text-red-700 shadow-inner"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <span
                  className={`flex items-center justify-center ${
                    active === item.name ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            </Link>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-red-100 hover:text-red-700 transition"
        >
          <LogOut className="h-5 w-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
