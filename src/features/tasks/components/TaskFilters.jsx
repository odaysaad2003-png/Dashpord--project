function TaskFilters({
    selectedStatus,
    selectedPriority,
    statusOptions,
    priorityOptions,
    onStatusChange,
    onPriorityChange,
}) {
    return (
        <div className="task-filters">
            <select value={selectedStatus} onChange={(event) => onStatusChange(event.target.value)}>
                {statusOptions.map((status) => (
                    <option key={status} value={status}>
                        Status: {status}
                    </option>
                ))}
            </select>

            <select value={selectedPriority} onChange={(event) => onPriorityChange(event.target.value)}>
                {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                        Priority: {priority}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TaskFilters;
