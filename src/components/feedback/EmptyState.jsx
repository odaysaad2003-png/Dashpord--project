import {Inbox} from "lucide-react";
import "./feedback.css";

export default function EmptyState({
    title = "No data found",
    description = "There is nothing to display right now.",
    actionLabel,
    onAction,
}) {
    return (
        <div className="empty-state-box">
            <div className="empty-state-icon">
                <Inbox size={28} />
            </div>

            <h3>{title}</h3>
            <p>{description}</p>

            {actionLabel && (
                <button className="primary-button" onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
