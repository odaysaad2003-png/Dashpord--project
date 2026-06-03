// Production build import casing fixed

import {Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";

import DashboardPage from "./features/dashboard/DashboardPage";
import EmployeesPage from "./features/employees/EmployeesPage";
import Department from "./features/departments/Department";
import ProjectsPage from "./features/projects/ProjectsPage";
import TasksPage from "./features/tasks/TasksPage";
import ReportsPage from "./features/reports/ReportsPage";
import SettingsPage from "./features/settings/SettingsPage";

import Loginpages from "./features/auth/Loginpages";
import Registerpages from "./features/auth/Registerpages";

function App() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Loginpages />} />
                <Route path="/register" element={<Registerpages />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />

                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/departments" element={<Department />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
