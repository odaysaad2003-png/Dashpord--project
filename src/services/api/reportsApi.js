import { reports } from "./database";
import { fakeRequest } from "./ApiClint";

export async function getReports() {
  return fakeRequest(reports);
}

export async function getReportById(reportId) {
  const report = reports.find((item) => item.id === Number(reportId));

  if (!report) {
    throw new Error("Report not found.");
  }

  return fakeRequest(report);
}
