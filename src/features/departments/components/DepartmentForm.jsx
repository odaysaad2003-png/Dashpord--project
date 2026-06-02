import { useState } from "react";



export default function DepartmentForm({initialData = null, onSubmit, onCancel}) {
    const [formData, setFormData] = useState(
        initialData || {
        name: "",
        manager: "",
        employeesCount: 0,
        activeProjects: 0,
        budget: 4500,
        status: "Active",
    });

    function updateField(field, value) {
        setFormData((prev) => ({...prev, [field]: value}));
    }

    // function validateForm() {
    //     const nextErrors = {};
    //     if (!formData.name.trim()) nextErrors.name = "Department name is required.";
    //     if (!formData.manager.trim()) nextErrors.email = "Manager required.";
    //     if (!formData.budget.trim()) nextErrors.role = "budget is required.";

    //     setErrors(nextErrors);
    //     return Object.keys(nextErrors).length === 0;
    // }

    function handleSubmit(e) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        e.preventDefault();
        // if (!validateForm()) return;
        onSubmit(formData);
          console.log("submitted");
          console.log(formData);
    }

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            {/* نفس الحقول اللي عملناها للـ Add */}
            {/* <div className="form-field">
                <label>Department Name</label>
                <input value={formData.name} onChange={(e) => updateField("Department name", e.target.value)} />
            </div> */}

            <div className="form-field">
                <label>Department Name</label>
                <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
            </div>
            <div className="form-field">
                <label>manager</label>
                <input value={formData.manager} onChange={(e) => updateField("manager", e.target.value)} />
            </div>
            <div className="form-field">
                <label>status</label>
                <select value={formData.status} onChange={(e) => updateField("status", e.target.value)}>
                    {["active", "Review", "not active", "leave"].map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-field">
                <label>budget</label>
                <input value={formData.budget} onChange={(e) => updateField("budget", Number(e.target.value))} />
            </div>
            <div className="form-field">
                <label>activeProjects</label>
                <input
                    value={formData.activeProjects}
                    onChange={(e) => updateField("activeProjects", Number(e.target.value))}
                />
            </div>
            <div className="form-field">
                <label>employeesCount</label>
                <input
                    value={formData.employeesCount}
                    onChange={(e) => updateField("employeesCount", Number(e.target.value))}
                />
            </div>

            <div className="form-actions">
                <button type="button" className="secondary-button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="primary-button">
                  {  initialData ? "Update Department" : "Add Department"}
                </button>
            </div>
        </form>
    );
}
