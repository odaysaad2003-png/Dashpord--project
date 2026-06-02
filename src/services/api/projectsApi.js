import { projects } from "./database";
import { fakeRequest } from "./ApiClint"; 

export async function getProjects() {
  return fakeRequest(projects);
}

export async function getProjectById(projectId) {
  const project = projects.find((item) => item.id === Number(projectId));

  if (!project) {
    throw new Error("Project not found.");
  }

  return fakeRequest(project);
}
