import "./feedback.css";

export function Skeleton({className = ""}) {
    return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton() {
    return (
        <div className="skeleton-card">
            <Skeleton className="skeleton-icon" />
            <Skeleton className="skeleton-line large" />
            <Skeleton className="skeleton-line" />
            <Skeleton className="skeleton-line short" />
        </div>
    );
}

export function TableSkeleton({rows = 5}) {
    return (
        <div className="skeleton-table">
            {Array.from({length: rows}).map((_, index) => (
                <div className="skeleton-table-row" key={index}>
                    <Skeleton className="skeleton-avatar" />
                    <Skeleton className="skeleton-line" />
                    <Skeleton className="skeleton-line short" />
                    <Skeleton className="skeleton-line short" />
                </div>
            ))}
        </div>
    );
}
