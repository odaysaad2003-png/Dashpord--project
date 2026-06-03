import { useEffect, useState } from "react";
import {Building2, Users, FolderKanban, DollarSign} from "lucide-react";

// form modal
import DepartmentForm from "../../features/departments/components/DepartmentForm";

// form modal

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SectionCard from "../../components/ui/SectionCard";
import DepartmentCard from "./components/DepartmentCard";

//api reqwest
import {useDepartments} from "../../hooks/useDepartments";

// status
import {TableSkeleton} from "../../components/feedback/Skeleton";
import ErrorState from "../../components/feedback/ErrorState";
//api reqwest

// modal
import Modal from "../../components/overlay/Modal";
// modal
// toast
import {useToast} from "../../context/ToastContext";
// toast

/// confirm delet
import ConfirmDialog from "../../components/overlay/ConfirmDialog";

import "./departments.css";

export default function Department() {
    const {departments, isLoading, error, reloadDepartments} = useDepartments();
    const [isadddepartmentModalOpen, setisadddepartmentModalOpen] = useState(false);
    const [localdepartment, setlocaldeoartment] = useState([]);
        const [departmentToEdit, setDepartmentToEdit] = useState(null);
        const[departmentToDelete, setDepartmentToDelete] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setlocaldeoartment(departments);
    }, [departments]);

    const {showToast} = useToast();

    const totalEmployees = localdepartment.reduce((total, department) => total + department.employeesCount, 0);

    const totalProjects = localdepartment.reduce((total, department) => total + department.activeProjects, 0);

    const totalBudget = localdepartment.reduce((total, department) => total + department.budget, 0);

    // add employee function

    function handleAddEmployee(newdepartment) {
        // setlocaldeoartment([...localdepartment, newdepartment]); false because it depends on the previous state and may cause bugs if state updates are batched, leading to stale state issues.
        // setlocaldeoartment([...localdepartment, newdepartment]); true but not recomended
        // setlocaldeoartment((prev) => [...prev, newdepartment]); true and recomended because it ensures that we are working with the most up-to-date state, even if multiple updates are batched together.
          setlocaldeoartment((prev) => [
              ...prev,
              {
                  ...newdepartment,
                  id: Date.now(),
              },
          ]);

        setisadddepartmentModalOpen(false);
        showToast({
            type: "success",
            title: "department added",
            message: `${newdepartment.name} has been added successfully.`,
        });
    }


    // handle confirm delet and delete function


 function handleAskDelete(department) {
     setDepartmentToDelete(department);
 }


function handledeletdone() {
    console.log("oady")
        setlocaldeoartment((department) => department.filter((employee) => employee.id !== departmentToDelete.id));

setDepartmentToDelete(null);}



    // handle confirm delet and delete function ====== end

    return (
        <>
            <PageHeader
                title="Departments"
                description="Monitor company departments, teams, managers, and operational capacity."
                actionLabel="Add Department"
                onAction={() => setisadddepartmentModalOpen(true)}
            />
            {isLoading && <TableSkeleton rows={6} />}
            
            {error && <ErrorState message={error} onRetry={reloadDepartments} />}
            {!isLoading && !error && (
                <>
                    <div className="stats-grid">
                        <StatCard
                            title="Departments"
                            value={departments.length}
                            change="Company units"
                            icon={Building2}
                            variant="blue"
                        />

                        <StatCard
                            title="Total Employees"
                            value={totalEmployees} //totalEmployees
                            change="Across all departments"
                            icon={Users}
                            variant="green"
                        />

                        <StatCard
                            title="Active Projects"
                            value={totalProjects} //totalProjects
                            change="Department projects"
                            icon={FolderKanban}
                            variant="purple"
                        />

                        <StatCard
                            title="Total Budget"
                            value={`$${totalBudget.toLocaleString()}`} //`$${totalBudget.toLocaleString()}`
                            change="Allocated budget"
                            icon={DollarSign}
                            variant="orange"
                        />
                    </div>
                    <SectionCard title="Department Overview">
                        <div className="departments-grid">
                            {localdepartment.map((department) => (
                                <DepartmentCard
                                    key={department.id}
                                    department={department}
                                    setDepartmentToEdit={setDepartmentToEdit}
                                    onDelete={handleAskDelete}

                                    //     (dept) => {
                                    //     setlocaldeoartment((currentDepartments) =>
                                    //         currentDepartments.filter((d) => d.id !== dept.id)
                                    //     );
                                    // }
                                />
                            ))}
                        </div>
                    </SectionCard>
                    <Modal
                        isOpen={isadddepartmentModalOpen}
                        title="Add New Department"
                        description="Create a new Department profile and assign department details."
                        onClose={() => setisadddepartmentModalOpen(false)}
                    >
                        <DepartmentForm
                            onSubmit={handleAddEmployee}
                            onCancel={() => setisadddepartmentModalOpen(false)}
                            initialData={localdepartment}
                        />
                    </Modal>
                    {/* modal to edit the departments */}
                    <Modal
                        isOpen={Boolean(departmentToEdit)}
                        title="Edit Department"
                        description={`Update ${departmentToEdit?.name} information.`}
                        onClose={() => setDepartmentToEdit(null)}
                    >
                        // eslint-disable-next-line no-undef
                        <DepartmentForm
                            initialData={departmentToEdit}
                            onSubmit={(updatedDepartment) => {
                                setlocaldeoartment((prev) =>
                                    prev.map((dept) => (dept.id === updatedDepartment.id ? updatedDepartment : dept))
                                );

                                showToast({
                                    type: "success",
                                    title: "Department updated",
                                    message: `${updatedDepartment.name} has been updated successfully.`,
                                });

                                setDepartmentToEdit(null);
                            }}
                            onCancel={() => setDepartmentToEdit(null)}
                        />
                    </Modal>
                    {/* modal to edit the departments */}
                    {/* confirm to sure the delete opration */}
                    <ConfirmDialog
                        isOpen={Boolean(departmentToDelete)}
                        type="danger"
                        title="Delete employee?"
                        description={
                            departmentToDelete
                                ? `Are you sure you want to delete ${departmentToDelete.name}? This action cannot be undone.`
                                : ""
                        }
                        confirmLabel="Delete"
                        cancelLabel="Cancel"
                        onConfirm={handledeletdone}
                        onCancel={() => setDepartmentToDelete(null)}
                    />
                    {/* confirm to sure the delete opration */}
                </>
            )}
        </>
    );
}
