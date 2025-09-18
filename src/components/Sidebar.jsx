import React, { useState } from "react";
import {
  Home,
  Users,
  FileText,
  Settings,
  BarChart3,
  Mail,
  Calendar,
  Database,
  Shield,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Application</h2>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-3">
          <Link to="/">
            <button
              onClick={() => setActive("dashboard")}
              className={`
                w-full flex gap-2 items-center px-3 py-2 text-sm font-medium rounded-md
                ${
                  active === "dashboard"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Home className="mr-4 h-4 w-4" />
              Dashboard
            </button>
          </Link>

          <Link to="/users" className="">
            <button
              onClick={() => setActive("users")}
              className={`
                w-full flex gap-2 items-center mt-1 px-3 py-2 text-sm font-medium rounded-md
                ${
                  active === "users"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Users className="mr-4 h-4 w-4" />
              Users
            </button>
          </Link>

          <Link to="/items" className="">
            <button
              onClick={() => setActive("items")}
              className={`
                w-full flex gap-2 items-center mt-1 px-3 py-2 text-sm font-medium rounded-md
                ${
                  active === "items"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Users className="mr-4 h-4 w-4" />
              Items
            </button>
          </Link>

          <Link to="/rooms" className="">
            <button
              onClick={() => setActive("rooms")}
              className={`
                w-full flex gap-2 items-center mt-1 px-3 py-2 text-sm font-medium rounded-md
                ${
                  active === "rooms"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Users className="mr-4 h-4 w-4" />
              Rooms
            </button>
          </Link>
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button
          onClick={() => setActive("logout")}
          className="w-full gap-2 flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="mr-4 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
