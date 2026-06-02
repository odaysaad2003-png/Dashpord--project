import { useState } from "react";

export default function ProjectForm({initialData = null, onSubmit, onCancel}) {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            client: "",
            manager: "",
            status: "Active",
            dueDate: "11-12-2003",
            priority: "",
            progress:"",
        }
    );

    const [errors, setErrors] = useState({});

    function updateField(field, value) {
        setFormData((prev) => ({...prev, [field]: value}));
        setErrors((prev) => ({...prev, [field]: ""}));
    }

    function validateForm() {
        const nextErrors = {};
        if (!formData.name.trim()) nextErrors.name = "Project name is required.";
        if (!formData.manager) nextErrors.manager = "manager is required.";
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
                <label>Full Name</label>
                <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-field">
                <label>client</label>
                <input value={formData.client} onChange={(e) => updateField("client", e.target.value)} />
                {errors.client && <span className="form-error">{errors.client}</span>}
            </div>

            <div className="form-field">
                <label>manager</label>
                <input value={formData.manager} onChange={(e) => updateField("manager", e.target.value)} />
                {errors.manager && <span className="form-error">{errors.manager}</span>}
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
                    {["Active", "On Leave", "Inactive"].map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

                <div className="form-field">
                <label>progress</label>
                <input value={formData.progress} onChange={(e) => updateField("progress", e.target.value)} />
                {errors.progress && <span className="form-error">{errors.progress}</span>}
            </div>
            

            <div className="form-actions">
                <button type="button" className="secondary-button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="primary-button">
                    {initialData ? "Update project" : "Add project"}
                </button>
            </div>
        </form>
    );
}
