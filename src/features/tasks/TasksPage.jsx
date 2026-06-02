import {useState, useEffect} from "react";
import {CheckSquare, Clock, AlertTriangle, CheckCircle2} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SectionCard from "../../components/ui/SectionCard";

import TaskCard from "./components/TaskCard";
import TaskFilters from "./components/TaskFilters";

//api reqwest
import {useTasks} from "../../hooks/useTasks";

//api reqwest



// status
import {TableSkeleton} from "../../components/feedback/Skeleton";
import ErrorState from "../../components/feedback/ErrorState";
import EmptyState from "../../components/feedback/EmptyState";


// modal
import Modal from "../../components/overlay/Modal";
// toast
import {useToast} from "../../context/ToastContext";
// toast
//import task form
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "../../components/overlay/ConfirmDialog";
import "./tasks.css";

// eslint-disable-next-line react-refresh/only-export-components

const statusOptions = ["All", "Pending", "In Progress", "Completed"];
const priorityOptions = ["All", "High", "Medium", "Low"];

function TasksPage() {
    // eslint-disable-next-line no-undef
    const {tasks, isLoading, error, reloadTasks} = useTasks();
    const [localTasks, setLocalTasks] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");


    //modal and toast and oprations
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const {showToast} = useToast();

    // eslint-disable-next-line no-unused-vars
    const pendingTasks = localTasks.filter((task) => task.status === "Pending").length;

    const completedTasks = localTasks.filter((task) => task.status === "Completed").length;
    const inProgressTasks = localTasks.filter((task) => task.status === "In Progress").length;

    const highPriorityTasks = localTasks.filter((task) => task.priority === "High").length;

    const filteredTasks = localTasks.filter((task) => {
        const matchesStatus = selectedStatus === "All" || task.status === selectedStatus;

        const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority;

        return matchesStatus && matchesPriority;
    });

    function handleStatusChange(taskId, newStatus) {
        const updatedTasks = tasks.map((task) => {
            if (task.id !== taskId) {
                return task;
            }

            return {
                ...task,
                status: newStatus,
            };
        });

        setLocalTasks(updatedTasks);
    }

    // eslint-disable-next-line no-undef
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalTasks(tasks);
    }, [tasks]);


    /**==========  the addproject and edit and delet function action=======*/

function handleAddTask(newTask) {
    // setlocalTask([...localTask, newTask]); false because it depends on the previous state and may cause bugs if state updates are batched, leading to stale state issues.
    // setlocalTask([...localTask, newTask]); true but not recomended
    // setlocalTask((prev) => [...prev, newTask]); true and recomended because it ensures that we are working with the most up-to-date state, even if multiple updates are batched together.
    setLocalTasks((prev) => [
        ...prev,
        {
            ...newTask,
            id: Date.now(),
        },
    ]);

    setIsTaskModalOpen(false);
    showToast({
        type: "success",
        title: "Task added",
        message: `${newTask.name} has been added successfully.`,
    });
}


//ask delet
 function handleAskDelete(Task) {
     setTaskToDelete(Task);
 }
// delet done
function handledeletdone() {
    setLocalTasks((tasks) => tasks.filter((Task) => Task.id !== taskToDelete.id));

    setTaskToDelete(null);
    showToast({
        type: "success",
        title: "Task deleted",
        message: `${taskToDelete.name} has been deleted successfully.`,
    });
}


{/** ======= the addTask function action=======*/}



  
         return (
             <>
                 <PageHeader
                     title="Tasks"
                     description="Track daily work, priorities, responsibility, and execution status."
                     actionLabel="Create Task"
                     onAction={() => setIsTaskModalOpen(true)}
                 />

                 {isLoading && <TableSkeleton rows={6} />}
                 {error && <ErrorState message={error} onRetry={reloadTasks} />}

                 {!isLoading && !error && (
                     <>
                         <div className="stats-grid">
                             <StatCard
                                 title="Total Tasks"
                                 value={tasks.length}
                                 change="All assigned tasks"
                                 icon={CheckSquare}
                                 variant="blue"
                             />

                             <StatCard
                                 title="In Progress"
                                 value={inProgressTasks}
                                 change="Currently being worked on"
                                 icon={Clock}
                                 variant="orange"
                             />

                             <StatCard
                                 title="Completed"
                                 value={completedTasks}
                                 change="Finished tasks"
                                 icon={CheckCircle2}
                                 variant="green"
                             />

                             <StatCard
                                 title="High Priority"
                                 value={highPriorityTasks}
                                 change="Needs attention"
                                 icon={AlertTriangle}
                                 variant="purple"
                             />
                         </div>

                         <SectionCard title="Task Board">
                             <TaskFilters
                                 selectedStatus={selectedStatus}
                                 selectedPriority={selectedPriority}
                                 statusOptions={statusOptions}
                                 priorityOptions={priorityOptions}
                                 onStatusChange={setSelectedStatus}
                                 onPriorityChange={setSelectedPriority}
                             />

                             <div className="tasks-grid">
                                 {filteredTasks.map((task) => (
                                     <TaskCard
                                         key={task.id}
                                         task={task}
                                         onStatusChange={handleStatusChange}
                                         onDelete={handleAskDelete}
                                         setTaskToEdit={setTaskToEdit}
                                     />
                                 ))}
                             </div>
                         </SectionCard>

                         {filteredTasks.length === 0 && (
                             <EmptyState
                                 title="No tasks match your current filters."
                                 description="Try changing your search term or tasks filter."
                             />
                         )}
                     </>
                 )}

                 {/* Modals for Add/Edit/Delete would go here */}
                 <Modal
                     isOpen={isTaskModalOpen}
                     title="Add New Task"
                     description="Create a new Task profile and assign Task details."
                     onClose={() => setIsTaskModalOpen(false)}
                 >
                     <TaskForm
                         onSubmit={handleAddTask}
                         onCancel={() => setIsTaskModalOpen(false)}
                         initialData={localTasks}
                     />
                 </Modal>

                 <Modal
                     isOpen={Boolean(taskToEdit)}
                     title="Edit Task"
                     description={`Update ${taskToEdit?.name} information.`}
                     onClose={() => setTaskToEdit(null)}
                 >
                     // eslint-disable-next-line no-undef
                     <TaskForm
                         initialData={taskToEdit}
                         onSubmit={(updatedTask) => {
                             setLocalTasks((prev) =>
                                 prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
                             );

                             showToast({
                                 type: "success",
                                 title: "Task updated",
                                 message: `${updatedTask.name} has been updated successfully.`,
                             });

                             setTaskToEdit(null);
                         }}
                         onCancel={() => setTaskToEdit(null)}
                     />
                 </Modal>
                 {/* confirm to sure the delete opration */}
                 <ConfirmDialog
                     isOpen={Boolean(taskToDelete)}
                     type="danger"
                     title="Delete Task?"
                     description={
                         taskToDelete
                             ? `Are you sure you want to delete ${taskToDelete.name}? This action cannot be undone.`
                             : ""
                     }
                     confirmLabel="Delete"
                     cancelLabel="Cancel"
                     onConfirm={handledeletdone}
                     onCancel={() => setTaskToDelete(null)}
                 />
                 {/* confirm to sure the delete opration */}
             </>
         );

     
    }
   


export default TasksPage;


   
