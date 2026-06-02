import { employees } from "./database";
import { fakeRequest } from "./ApiClint";

export async function getEmployees() {
  return fakeRequest(employees);
}

export async function getEmployeeById(employeeId) {
  const employee = employees.find((item) => item.id === Number(employeeId));

  if (!employee) {
    throw new Error("Employee not found.");
  }

  return fakeRequest(employee);
}
