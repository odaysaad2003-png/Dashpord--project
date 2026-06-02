import React from 'react'

import EmptyState from "../../../components/feedback/EmptyState";

import Can from "../../../components/common/Can";

import {useTranslation} from "react-i18next";

export default function EmployeesTable({filteredEmployees, onDelete, setEmployeeToEdit}) {
    const {t} = useTranslation();

    if (filteredEmployees.length === 0) {
        return (
            <EmptyState title="No employees found" description="Try changing your search term or department filter." />
        );
    } else {
        return (
            <>
                <div className="table-wrapper">
                    <table className="employees-table">
                        <thead>
                            <tr>
                                <th>{t("employees.employee")}</th>
                                <th>{t("employees.department")}</th>
                                <th>{t("employees.role")}</th>
                                <th>{t("employees.status")}</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>
                                        <div className="employee-cell">
                                            <div className="employee-avatar">{employee.name.charAt(0)}</div>

                                            <div>
                                                <strong>{employee.name}</strong>
                                                <span>{employee.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{employee.department}</td>
                                    <td>{employee.role}</td>
                                    <td>
                                        <span
                                            className={`employee-status ${employee.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                        >
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Can roles={["admin", "manager"]}>
                                            <button className="table-danger-button" onClick={() => onDelete(employee)}>
                                                Delete
                                            </button>
                                        </Can>
                                    </td>
                                    <td>
                                        <Can roles={[ "manager"]}>
                                            <button
                                                className="table-edit-button"
                                                onClick={() => setEmployeeToEdit(employee)}
                                            >
                                                Edit
                                            </button>
                                        </Can>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}
