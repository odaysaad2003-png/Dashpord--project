import {AlertTriangle} from "lucide-react";
import "./feedback.css";

export default function ErrorState({
    title = "Something went wrong",
    message = "We could not load the data. Please try again.",
    onRetry,
}) {
    return (
        <div className="error-state-box">
            <div className="error-state-icon">
                <AlertTriangle size={28} />
            </div>

            <h3>{title}</h3>
            <p>{message}</p>

            {onRetry && (
                <button className="secondary-button" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
}
