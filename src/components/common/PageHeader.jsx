import React from "react";

export default function PageHeader({title, description, actionLabel, onAction}) {
    return (
        <div className="page-header">
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            {actionLabel && (
                <button className="primary-button" onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
