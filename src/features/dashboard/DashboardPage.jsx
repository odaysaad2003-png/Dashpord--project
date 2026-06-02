import React from "react";
import {Users, FolderKanban, CheckSquare, Building2} from "lucide-react";
import "./dashboard.css";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SectionCard from "../../components/ui/SectionCard";

import { useTranslation } from "react-i18next";


const recentTasks = [
    {
        id: 1,
        title: "Review employee onboarding flow",
        status: "In Progress",
        owner: "Sara",
    },
    {
        id: 2,
        title: "Prepare monthly project report",
        status: "Pending",
        owner: "Ahmed",
    },
    {
        id: 3,
        title: "Update company website content",
        status: "Completed",
        owner: "Lina",
    },
];
const projects = [
    {
        id: 1,
        name: "HR Management System",
        progress: 72,
    },
    {
        id: 2,
        name: "Customer Portal",
        progress: 45,
    },
    {
        id: 3,
        name: "Finance Dashboard",
        progress: 88,
    },
    {
        id: 4,
        name: "maneger skils",
        progress: 90,
    },
];

export default function DashboardPage() {


const { t } = useTranslation();

    return (
        <>
            <PageHeader
                title={t("dashboard.title")}
                description="Overview of company performance, projects, and daily operations."
                actionLabel="Create Report"
                onAction={() => console.log("Create report clicked")}
            />

            <div className="stats-grid">
                <StatCard title="Employees" value="128" change="+12 this month" icon={Users} variant="blue" />

                <StatCard title="Departments" value="8" change="+1 new department" icon={Building2} variant="green" />

                <StatCard title="Active Projects" value="24" change="+4 active" icon={FolderKanban} variant="purple" />

                <StatCard title="Open Tasks" value="316" change="+28 today" icon={CheckSquare} variant="orange" />
            </div>

            <div className="content-grid">
                <SectionCard title="Recent Tasks">
                    <div className="task-list">
                        {recentTasks.map((task) => (
                            <div className="task-item" key={task.id}>
                                <div>
                                    <h4>{task.title}</h4>
                                    <p>Owner: {task.owner}</p>
                                </div>

                                <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard title="Project Progress">
                    <div className="project-list">
                        {projects.map((project) => (
                            <div className="project-item" key={project.id}>
                                <div className="project-info">
                                    <strong>{project.name}</strong>
                                    <span>{project.progress}%</span>
                                </div>

                                <div className="progress-track">
                                    <div className="progress-fill" style={{width: `${project.progress}%`}} />
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </>
    );
}
