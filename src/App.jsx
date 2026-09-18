import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./UsersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/users?page=1" replace />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}