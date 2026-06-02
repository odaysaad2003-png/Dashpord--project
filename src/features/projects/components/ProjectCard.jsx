import React from "react";
export default function ProjectCard({project, onDelete, setProjectToEdit, }) {
    const isCompleted = project.progress === 100;

    const progressLabel = isCompleted ? "Completed" : `${project.progress}% completed`;
    return (
        <article className="project-card">
            <div className="project-card-header">
                <div>
                    <h4>{project.name}</h4>
                    <p>{project.client}</p>
                </div>

                <span className={`priority-badge ${project.priority.toLowerCase()}`}>{project.priority}</span>
            </div>

            <div className="project-meta">
                <div>
                    <span>Manager</span>
                    <strong>{project.manager}</strong>
                </div>

                <div>
                    <span>Due Date</span>
                    <strong>{project.dueDate}</strong>
                </div>
            </div>

            <div className="project-progress-area">
                <div className="project-progress-info">
                    <span>{progressLabel}</span>
                    <strong>{project.status}</strong>
                </div>

                <div className="progress-track">
                    <div className="progress-fill" style={{width: `${project.progress}%`}} />
                </div>
            </div>
            <div className="action " style={{display: "flex", gap: "10px"}}>
                <button style={{width: "70px"}} className="table-edit-button" onClick={() => setProjectToEdit(project)}>
                    Edit
                </button>
                <button className="table-danger-button" onClick={() => onDelete(project)}>
                    Delete
                </button>
            </div>
        </article>
    );
}
