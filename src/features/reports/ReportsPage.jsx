import {useState} from "react";
import {BarChart3, FileText, TrendingUp, Download, Clock} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SectionCard from "../../components/ui/SectionCard";

//api reqwest
import {useReports} from "../../hooks/useReports";
// status
import {TableSkeleton} from "../../components/feedback/Skeleton";
import ErrorState from "../../components/feedback/ErrorState";
import EmptyState from "../../components/feedback/EmptyState";
//api reqwest

import "./reports.css";

const reportTypes = ["All", "Performance", "Productivity", "Marketing", "Finance"];

function ReportsPage() {
    const [selectedType, setSelectedType] = useState("All");

    const {reports, isLoading, error, reloadreports} = useReports();

    const filteredReports = reports.filter((report) => {
        return selectedType === "All" || report.type === selectedType;
    });

    const readyReports = reports.filter((report) => report.status === "Ready").length;

    const averageScore = Math.round(reports.reduce((total, report) => total + report.score, 0) / reports.length);

    return (
        <>
            <PageHeader
                title="Reports"
                description="Analyze company performance, productivity, and department results."
                actionLabel="Generate Report"
                onAction={() => console.log("Generate report clicked")}
            />

            {isLoading && <TableSkeleton rows={6}/>}
            {error && <ErrorState message={error} onRetry={reloadreports} />}

            {!isLoading && !error && (
                <>
                    <div className="stats-grid">
                        <StatCard
                            title="Total Reports"
                            value={reports.length}
                            change="Available reports"
                            icon={FileText}
                            variant="blue"
                        />

                        <StatCard
                            title="Ready Reports"
                            value={readyReports}
                            change="Ready to export"
                            icon={Download}
                            variant="green"
                        />

                        <StatCard
                            title="Average Score"
                            value={`${averageScore}%`}
                            change="Company performance"
                            icon={TrendingUp}
                            variant="purple"
                        />

                        <StatCard
                            title="Last Update"
                            value="Today"
                            change="Reports refreshed"
                            icon={Clock}
                            variant="orange"
                        />
                    </div>

                    <div className="reports-layout">
                        <SectionCard title="Reports Library">
                            <div className="reports-toolbar">
                                {reportTypes.map((type) => (
                                    <button
                                        key={type}
                                        className={selectedType === type ? "report-filter active" : "report-filter"}
                                        onClick={() => setSelectedType(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="reports-list">
                                {filteredReports.map((report) => (
                                    <article className="report-card" key={report.id}>
                                        <div className="report-icon">
                                            <BarChart3 size={22} />
                                        </div>

                                        <div className="report-main">
                                            <div className="report-card-header">
                                                <div>
                                                    <h4>{report.title}</h4>
                                                    <p>{report.department}</p>
                                                </div>

                                                <span className={`report-status ${report.status.toLowerCase()}`}>
                                                    {report.status}
                                                </span>
                                            </div>

                                            <div className="report-meta">
                                                <span>{report.type}</span>
                                                <span>{report.date}</span>
                                            </div>

                                            <div className="report-score-row">
                                                <span>Performance Score</span>
                                                <strong>{report.score}%</strong>
                                            </div>

                                            <div className="report-progress-track">
                                                <div
                                                    className="report-progress-fill"
                                                    style={{width: `${report.score}%`}}
                                                />
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard title="Department Insights">
                            <div className="insights-list">
                                <div className="insight-card strong">
                                    <span>Best Department</span>
                                    <strong>Finance</strong>
                                    <p>Highest score this month: 91%</p>
                                </div>

                                <div className="insight-card">
                                    <span>Needs Attention</span>
                                    <strong>Marketing</strong>
                                    <p>Campaign score dropped below 70%</p>
                                </div>

                                <div className="insight-card">
                                    <span>Recommended Action</span>
                                    <strong>Review productivity plan</strong>
                                    <p>Focus on task completion and delivery speed.</p>
                                </div>
                            </div>
                        </SectionCard>
                    </div>
                </>
            )}
        </>
    );
}

export default ReportsPage;
