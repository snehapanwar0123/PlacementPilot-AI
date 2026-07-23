import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import MockInterview from "../pages/MockInterview";
import CompanyTracker from "../pages/CompanyTracker";
import Roadmap from "../pages/Roadmap";
import CodingArena from "../pages/CodingArena";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route
          path="/company-tracker"
          element={
            <ProtectedRoute>
              <CompanyTracker />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }/>
          <Route 
          path="/coding-arena" 
          element={
          <CodingArena />
        } 
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />

    </Routes>
  );
}