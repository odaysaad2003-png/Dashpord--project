import { useState } from "react";

export default function EmployeeForm({initialData = null, onSubmit, onCancel}) {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            email: "",
            department: "Engineering",
            role: "",
            status: "Active",
        }
    )

    const [errors, setErrors] = useState({});

    function updateField(field, value) {
        setFormData((prev) => ({...prev, [field]: value}));
        setErrors((prev) => ({...prev, [field]: ""}));
    }

    function validateForm() {
        const nextErrors = {};
        if (!formData.name.trim()) nextErrors.name = "Employee name is required.";
        if (!formData.email.trim()) nextErrors.email = "Email required.";
        else if (!formData.email.includes("@")) nextErrors.email = "Enter valid email.";
        if (!formData.role.trim()) nextErrors.role = "Role is required.";

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
                <label>Email Address</label>
                <input value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-field">
                <label>Department</label>
                <select value={formData.department} onChange={(e) => updateField("department", e.target.value)}>
                    {["Engineering", "HR", "Marketing", "Finance"].map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-field">
                <label>Role</label>
                <input value={formData.role} onChange={(e) => updateField("role", e.target.value)} />
                {errors.role && <span className="form-error">{errors.role}</span>}
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

            <div className="form-actions">
                <button type="button" className="secondary-button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="primary-button">
                    {initialData ? "Update Employee" : "Add Employee"}
                </button>
            </div>
        </form>
    );
}
