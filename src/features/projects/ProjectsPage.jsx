import {FolderKanban, Clock, CheckCircle2, AlertTriangle} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SectionCard from "../../components/ui/SectionCard";

import ProjectCard from "./components/ProjectCard";
import {useProjects} from "../../hooks/useProjects";
// status
import {TableSkeleton} from "../../components/feedback/Skeleton";
import ErrorState from "../../components/feedback/ErrorState";

// modal
import Modal from "../../components/overlay/Modal";
// toast
import {useToast} from "../../context/ToastContext";
// toast

/// confirm delet
import ConfirmDialog from "../../components/overlay/ConfirmDialog";
import ProjectForm from "./components/ProjectForm";
import "./projects.css";
import { useState , useEffect } from "react";

export default function ProjectsPage() {
    // eslint-disable-next-line no-undef
    const {projects, isLoading, error, reloadProjects} = useProjects();
    const [ localProject , setlocalProject] =useState(null)
    const [isaddProjectModalOpen, setisaddProjectModalOpen] = useState(false);

    const [ProjectToEdit, setProjectToEdit] = useState(null);
    // const [ProjectToDelete, setProjectToDelete] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setlocalProject(projects);
    }, [projects]);

    const {showToast} = useToast();

{/**==========  the addproject and edit and delet function action=======*/}

function handleAddProject(newproject) {
    // setlocalProject([...localproject, newproject]); false because it depends on the previous state and may cause bugs if state updates are batched, leading to stale state issues.
    // setlocalProject([...localproject, newproject]); true but not recomended
    // setlocalProject((prev) => [...prev, newproject]); true and recomended because it ensures that we are working with the most up-to-date state, even if multiple updates are batched together.
    setlocalProject((prev) => [
        ...prev,
        {
            ...newproject,
            id: Date.now(),
        },
    ]);

    setisaddProjectModalOpen(false);
    showToast({
        type: "success",
        title: "project added",
        message: `${newproject.name} has been added successfully.`,
    });
}




{/** ======= the addproject function action=======*/}



    

    const completedProjects = projects.filter((project) => project.status === "Completed").length;

    const inProgressProjects = projects.filter((project) => project.status === "In Progress").length;

    const highPriorityProjects = projects.filter((project) => project.priority === "High").length;

    return (
        <>
            <PageHeader
                title="Projects"
                description="Track company projects, priorities, progress, and delivery status."
                actionLabel="Create Project"
                onAction={() => setisaddProjectModalOpen(true)}
            />

            {isLoading && <TableSkeleton rows={6} />}

            {error && <ErrorState message={error} onRetry={reloadProjects} />}

            {!isLoading && !error && (
                <>
                    <div className="stats-grid">
                        <StatCard
                            title="Total Projects"
                            value={projects.length}
                            change="All company projects"
                            icon={FolderKanban}
                            variant="blue"
                        />

                        <StatCard
                            title="In Progress"
                            value={inProgressProjects}
                            change="Currently active"
                            icon={Clock}
                            variant="orange"
                        />

                        <StatCard
                            title="Completed"
                            value={completedProjects}
                            change="Delivered successfully"
                            icon={CheckCircle2}
                            variant="green"
                        />

                        <StatCard
                            title="High Priority"
                            value={highPriorityProjects}
                            change="Needs attention"
                            icon={AlertTriangle}
                            variant="purple"
                        />
                    </div>
                    <SectionCard title="Project Portfolio">
                        <div className="projects-grid">
                            {localProject.map((project) => (
                                <ProjectCard key={project.id} project={project} setProjectToEdit={setProjectToEdit} />
                            ))}
                        </div>
                    </SectionCard>
                </>
            )}

            <Modal
                isOpen={isaddProjectModalOpen}
                title="Add New Project"
                description="Create a new Project profile and assign Project details."
                onClose={() => setisaddProjectModalOpen(false)}
            >
                <ProjectForm
                    onSubmit={handleAddProject}
                    onCancel={() => setisaddProjectModalOpen(false)}
                    initialData={localProject}
                />
            </Modal>

            <Modal
                isOpen={Boolean(ProjectToEdit)}
                title="Edit Project"
                description={`Update ${ProjectToEdit?.name} information.`}
                onClose={() => setProjectToEdit(null)}
            >
                // eslint-disable-next-line no-undef
                <ProjectForm
                    initialData={ProjectToEdit}
                    onSubmit={(updatedProject) => {
                        setlocalProject((prev) =>
                            prev.map((dept) => (dept.id === updatedProject.id ? updatedProject : dept))
                        );

                        showToast({
                            type: "success",
                            title: "Project updated",
                            message: `${updatedProject.name} has been updated successfully.`,
                        });

                        setProjectToEdit(null);
                    }}
                    onCancel={() => setProjectToEdit(null)}
                />
            </Modal>
        </>
    );
}
