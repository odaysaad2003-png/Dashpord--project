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




  
         return (
             <>
                 <PageHeader
                     title="Tasks"
                     description="Track daily work, priorities, responsibility, and execution status."
                     actionLabel="Create Task"
                     onAction={() => console.log("Create task clicked")}
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
                                     <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
                                 ))}
                             </div>
                         </SectionCard>


                         { filteredTasks.length === 0 &&(<EmptyState
                     title="No tasks match your current filters."
                     description="Try changing your search term or tasks filter."
                 />)}
                     </>
                 )}
             </>
         );

     
    }
   


export default TasksPage;


   
