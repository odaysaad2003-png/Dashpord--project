import { departments } from "./database";
import { fakeRequest } from "./ApiClint";

export async function getDepartments() {
  return fakeRequest(departments);
}

export async function getDepartmentById(departmentId) {
  const department = departments.find(
    (item) => item.id === Number(departmentId),
  );

  if (!department) {
    throw new Error("Department not found.");
  }

  return fakeRequest(department);
}
