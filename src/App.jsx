import React from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Rooms from "./pages/Rooms";

const token = true;

function App() {
  return (
    <div className="flex h-screen" style={{ direction: "rtl" }}>
      {token && <Sidebar />}
      <main className="flex-1 overflow-auto">
        <Routes>
          {!token && <Route path="*" element={<Login />} />}
          {token && (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/items" element={<Items />} />
              <Route path="/rooms" element={<Rooms />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
