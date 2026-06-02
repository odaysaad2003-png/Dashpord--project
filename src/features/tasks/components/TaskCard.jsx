function TaskCard({task, onStatusChange , onDelete, setTaskToEdit}) {
    return (
        <article className="task-card">
            <div className="task-card-top">
                <span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span>

                <span className={`task-status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
            </div>

            <h4>{task.title}</h4>

            <div className="task-details">
                <div>
                    <span>Project</span>
                    <strong>{task.project}</strong>
                </div>

                <div>
                    <span>Owner</span>
                    <strong>{task.owner}</strong>
                </div>

                <div>
                    <span>Due Date</span>
                    <strong>{task.dueDate}</strong>
                </div>
            </div>
            <div className="action " style={{display: "flex", gap: "10px"}}>
                <button style={{width: "70px"}} className="table-edit-button" onClick={() => setTaskToEdit(task)}>
                    Edit
                </button>
                <button className="table-danger-button" onClick={() => onDelete(task)}>
                    Delete
                </button>
            </div>

            <div className="task-actions">
                <label>Change Status</label>

                <select value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </article>
    );
}

export default TaskCard;
