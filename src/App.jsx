import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React, { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Flooers from "./pages/Flooers";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Rooms from "./pages/Rooms";
import QrRooms from "./pages/QrRooms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "./components/LoadingScreen";
import QrItems from "./pages/QrItems";
import NotFound from "./pages/NotFound";
import useWindowSize from "@/hooks/useWindowSize";

function App() {
  const location = useLocation();
  const queryClient = new QueryClient();
  const token = localStorage.getItem("token");
  const width = useWindowSize();

  const hideSidebarPaths = ["/login"];
  const hideSidebar =
    hideSidebarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/flooers/") ||
    location.pathname.startsWith("/rooms/") ||
    width < 772;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen" style={{ direction: "rtl" }}>
          {token && !hideSidebar && <Sidebar />}
          <main className="flex-1 overflow-auto">
            <Routes>
              {/* Public routes - No login required for QR code pages */}
              <Route path="/flooers/:id" element={<QrRooms />} />
              <Route path="/rooms/:id" element={<QrItems />} />

              {token ? (
                <>
                  <Route path="/flooers" element={<Flooers />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/items" element={<Items />} />
                  <Route path="/users" element={<Users />} />
                  <Route
                    path="/"
                    element={<Navigate to="/flooers" replace />}
                  />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
