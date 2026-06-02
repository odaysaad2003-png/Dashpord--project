import React from 'react'

export default function SectionCard({title, children}) {
    return (
        <section className="section-card">
            {title && <h3>{title}</h3>}
            {children}
        </section>
    );
}
