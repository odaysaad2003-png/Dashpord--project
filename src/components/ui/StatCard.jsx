import React from "react";

export default function StatCard({title, value, icon: Icon, change, variant = "blue"}) {
    return (
        <div className={`stat-card stat-card-${variant}`}>
            <div className="stat-card-content">
                <span>{title}</span>
                <h3>{value}</h3>

                {change && <p>{change}</p>}
            </div>

            {Icon && (
                <div className="stat-card-icon">
                    <Icon size={24} />
                </div>
            )}
        </div>
    );
}
