import {Users, FolderKanban, Wallet} from "lucide-react";

function DepartmentCard({department, setDepartmentToEdit, onDelete}) {
    const budgetFormatted = department.budget.toLocaleString();

    return (
        <article className="department-card">
            <div className="department-card-header">
                <div>
                    <h4>{department.name}</h4>
                    <p>Manager: {department.manager}</p>
                </div>

                <span className={`department-status ${department.status.toLowerCase()}`}>{department.status}</span>
            </div>

            <div className="department-metrics">
                <div className="department-metric">
                    <Users size={18} />
                    <div>
                        <span>Employees</span>
                        <strong>{department.employeesCount}</strong>
                    </div>
                </div>

                <div className="department-metric">
                    <FolderKanban size={18} />
                    <div>
                        <span>Projects</span>
                        <strong>{department.activeProjects}</strong>
                    </div>
                </div>

                <div className="department-metric">
                    <Wallet size={18} />
                    <div>
                        <span>Budget</span>
                        <strong>${budgetFormatted}</strong>
                    </div>
                </div>
            </div>
            <div className="action " style={{display:"flex", gap:"10px"}}>
                <button
                    style={{width: "70px"}}
                    className="table-edit-button"
                    onClick={() => setDepartmentToEdit(department)}
                >
                    Edit
                </button>
                <button className="table-danger-button" onClick={() => onDelete(department)}>
                    Delete
                </button>
            </div>
        </article>
    );
}

export default DepartmentCard;
