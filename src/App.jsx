import {Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./components/layout/mainlayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import EmployeesPage from "./features/employees/EmployeesPage";
import Department from "./features/departments/Department";
import ProjectsPage from "./features/projects/ProjectsPage";
import TasksPage from "./features/tasks/TasksPage";
import ReportsPage from "./features/reports/ReportsPage";
import SettingsPage from "./features/settings/SettingsPage";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />

                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage/>} />
                    <Route path="/employees" element={<EmployeesPage/>} />
                    <Route path="/departments" element={<Department/>} />
                    <Route path="/projects" element={<ProjectsPage/>} />
                    <Route path="/tasks" element={<TasksPage/>} />
                    <Route path="/reports" element={<ReportsPage/>} />
                    <Route path="/settings" element={<SettingsPage/>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
