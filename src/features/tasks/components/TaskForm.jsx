import { useState } from "react";

export default function ProjectForm({initialData = null, onSubmit, onCancel}) {
    const [formData, setFormData] = useState(
        initialData || {
            title: "",
            owner: "",
            status: "Active",
            dueDate: "11-12-2003",
            priority: "",
            progress: "",
        }
    );

    const [errors, setErrors] = useState({});

    function updateField(field, value) {
        setFormData((prev) => ({...prev, [field]: value}));
        setErrors((prev) => ({...prev, [field]: ""}));
    }

    function validateForm() {
        const nextErrors = {};
        if (!formData.title.trim()) nextErrors.title = "Task title is required.";
        if (!formData.owner) nextErrors.owner = "Owner  is required.";
        if (!formData.priority) nextErrors.priority = "priority is required.";
        if (!formData.dueDate) nextErrors.dueDate = "due date is required example 00-00-0000.";

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit(formData);
    }

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            {/* نفس الحقول اللي عملناها للـ Add */}
            <div className="form-field">
                <label>Task Title</label>
                <input value={formData.title} onChange={(e) => updateField("title", e.target.value)} />
                {errors.title && <span className="form-error">{errors.title}</span>}
            </div>
            <div className="form-field">
                <label>Owner</label>
                <input value={formData.owner} onChange={(e) => updateField("owner", e.target.value)} />
                {errors.owner && <span className="form-error">{errors.owner}</span>}
            </div>
            <div className="form-field">
                <label>priority</label>
                <input value={formData.priority} onChange={(e) => updateField("priority", e.target.value)} />
                {errors.priority && <span className="form-error">{errors.priority}</span>}
            </div>
            <div className="form-field">
                <label>dueDate</label>
                <input value={formData.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} />
                {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
            </div>
            <div className="form-field">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => updateField("status", e.target.value)}>
                    {["In Progress", "Pending ", "Completed"].map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>
           
            <div className="form-actions">
                <button type="button" className="secondary-button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="primary-button">
                    {initialData ? "Update Task" : "Add Task"}
                </button>
            </div>
        </form>
    );
}
