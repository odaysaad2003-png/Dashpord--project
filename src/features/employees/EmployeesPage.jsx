import "./employee.css";
import React from "react";
import { useState ,useEffect } from "react";
import {Users, UserCheck, UserX, BriefcaseBusiness} from "lucide-react";


import {useEmployees} from "../../hooks/useEmployees"; // get data from data base


// import LoadingState from "../../components/common/LoadingState";
// import ErrorState from "../../components/common/ErrorState"; deleted use the status

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SectionCard from "../../components/ui/SectionCard";
import EmployeesFilters from "./components/EmployeesFilters"
import EmployeesTable from "./components/EmployeesTable";


// status empty error
import {TableSkeleton} from "../../components/feedback/Skeleton";
import ErrorState from "../../components/feedback/ErrorState";


//  modal and form to add empmloy
import Modal from "../../components/overlay/Modal";
import EmployeeForm from "./components/AddEmployeeForm";

//toast
import {useToast} from "../../context/ToastContext";
/// confirm delet
import ConfirmDialog from "../../components/overlay/ConfirmDialog";



   import { useTranslation } from "react-i18next";

const departments = ["All", "Engineering", "Human Resources", "Marketing", "Finance"];

export default function EmployeesPage() {
    const {t} = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [localEmployees, setLocalEmployees] = useState([]);
    //state for delet
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    //state for delet
    //edit state
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    //edit state

    //toast
    const {showToast} = useToast();

    const {employees, isLoading, error, reloadEmployees} = useEmployees();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalEmployees(employees);
    }, [employees]);

    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const activeEmployees = localEmployees.filter((employee) => employee.status === "Active").length;

    const onLeaveEmployees = localEmployees.filter((employee) => employee.status === "On Leave").length;

    const inactiveEmployees = localEmployees.filter((employee) => employee.status === "Inactive").length;

    const filteredEmployees = localEmployees.filter((employee) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.role.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    // add employee function
    function handleAddEmployee(newEmployee) {
        setLocalEmployees((currentEmployees) => [newEmployee, ...currentEmployees]);

        setIsAddModalOpen(false);
        showToast({
            type: "success",
            title: "Employee added",
            message: `${newEmployee.name} has been added successfully.`,
        });
    }

    //دالة فتح التاكيد
    function handleAskDelete(employee) {
        setEmployeeToDelete(employee);
    }
    // دالة الحذف الحقيقية
    function handleConfirmDelete() {
        setLocalEmployees((currentEmployees) =>
            currentEmployees.filter((employee) => employee.id !== employeeToDelete.id)
        );

        showToast({
            type: "success",
            title: "Employee deleted",
            message: `${employeeToDelete.name} has been removed successfully.`,
        });

        setEmployeeToDelete(null);
    }

    return (
        <>
            <>
                <PageHeader
                    title={t("employees.title")}
                    description={t("employees.description")}
                    actionLabel={t("employees.addEmployee")}
                    onAction={() => setIsAddModalOpen(true)}
                />

                {isLoading && <TableSkeleton rows={6} />}

                {error && <ErrorState message={error} onRetry={reloadEmployees} />}

                {!isLoading && !error && (
                    <>
                        <div className="stats-grid">
                            <StatCard
                                title={t("employees.totalEmployees")}
                                value={employees.length}
                                change={t("employees.companyTeamSize")}
                                icon={Users}
                                variant="blue"
                            />

                            <StatCard
                                title="Active"
                                value={activeEmployees}
                                change="Currently working"
                                icon={UserCheck}
                                variant="green"
                            />

                            <StatCard
                                title="On Leave"
                                value={onLeaveEmployees}
                                change="Temporary leave"
                                icon={BriefcaseBusiness}
                                variant="orange"
                            />

                            <StatCard
                                title="Inactive"
                                value={inactiveEmployees}
                                change="Not currently active"
                                icon={UserX}
                                variant="purple"
                            />
                        </div>
                        <SectionCard title={t("employees.employeeDirectory")}>
                            <EmployeesFilters
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedDepartment={selectedDepartment}
                                setSelectedDepartment={setSelectedDepartment}
                                departments={departments}
                            />

                            <EmployeesTable
                                onDelete={handleAskDelete}
                                setEmployeeToEdit={setEmployeeToEdit}
                                filteredEmployees={filteredEmployees}
                            />
                        </SectionCard>
                    </>
                )}
            </>
            <Modal
                isOpen={isAddModalOpen}
                title="Add New Employee"
                description="Create a new employee profile and assign department details."
                onClose={() => setIsAddModalOpen(false)}
            >
                <EmployeeForm onSubmit={handleAddEmployee} onCancel={() => setIsAddModalOpen(false)} />
            </Modal>
            <ConfirmDialog
                isOpen={Boolean(employeeToDelete)}
                type="danger"
                title="Delete employee?"
                description={
                    employeeToDelete
                        ? `Are you sure you want to delete ${employeeToDelete.name}? This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setEmployeeToDelete(null)}
            />
            {/* modal to edit the employees */}
            <Modal
                isOpen={Boolean(employeeToEdit)}
                title="Edit Employee"
                description={`Update ${employeeToEdit?.name} information.`}
                onClose={() => setEmployeeToEdit(null)}
            >
                // eslint-disable-next-line no-undef
                <EmployeeForm
                    initialData={employeeToEdit}
                    onSubmit={(updatedEmployee) => {
                        setLocalEmployees((prev) =>
                            prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
                        );

                        showToast({
                            type: "success",
                            title: "Employee updated",
                            message: `${updatedEmployee.name} has been updated successfully.`,
                        });

                        setEmployeeToEdit(null);
                    }}
                    onCancel={() => setEmployeeToEdit(null)}
                />
            </Modal>
            {/* modal to edit the employees */}
        </>
    );
}
