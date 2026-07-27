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
import PlanningZone from "../pages/PlanningZone";
import KnowledgeHub from "../pages/KnowledgeHub";
import KnowledgeDetails from "../pages/KnowledgeDetails";
import GoogleSuccess from "../pages/GoogleSuccess";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
    path="/auth/google/success"
    element={<GoogleSuccess />}
/>

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
        <Route  path="/roadmap/:id"  element={<Roadmap />}/>
          
          <Route 
          path="/coding-arena" 
          element={
          <CodingArena />
        } 
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/planning-zone" element={<PlanningZone />} />
          <Route
              path="/knowledge"
              element={
                <ProtectedRoute>
                  <KnowledgeHub />
                </ProtectedRoute>
              }
            />

            <Route
              path="/knowledge/:id"
              element={
                <ProtectedRoute>
                  <KnowledgeDetails />
                </ProtectedRoute>
              }
            />
          

    </Routes>
  );
}