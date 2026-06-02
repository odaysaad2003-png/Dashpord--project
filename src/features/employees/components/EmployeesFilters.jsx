import React from "react";

export default function EmployeesFilters({searchTerm, setSearchTerm, selectedDepartment, setSelectedDepartment, departments}) {
    return (
        <>
            <div className="employees-toolbar">
                <input
                    className="employees-search"
                    type="text"
                    placeholder="Search by name, email, or role..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <select
                    className="employees-filter"
                    value={selectedDepartment}
                    onChange={(event) => setSelectedDepartment(event.target.value)}
                >
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
