import { Home, Users, Shield, FileText } from "lucide-react";

export function getNavItems() {
  const role = localStorage.getItem("role");

  const baseItems = [
    {
      name: "flooers",
      label: "الطوابق",
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "rooms",
      label: "الغرف",
      icon: <Users className="h-5 w-5" />,
      path: "/rooms",
    },
    {
      name: "items",
      label: "الأصناف",
      icon: <FileText className="h-5 w-5" />,
      path: "/items",
    },
  ];

  if (role === "SuperAdmin") {
    baseItems.push({
      name: "users",
      label: "المستخدمون",
      icon: <Shield className="h-5 w-5" />,
      path: "/users",
    });
  }

  return baseItems;
}
