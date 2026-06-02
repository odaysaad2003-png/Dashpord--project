import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {LayoutDashboard, Users, FolderKanban, CheckSquare, Settings, Building2, BarChart3, X} from "lucide-react";
import "../../styles/layouts/sidebar.css";

// import {useLanguage} from "../../context/LanguageContext";
const navItems = [
    {labelKey: "navigation.dashboard", path: "/dashboard", icon: LayoutDashboard},
    {labelKey: "navigation.employees", path: "/employees", icon: Users},
    {labelKey: "navigation.departments", path: "/departments", icon: Building2},
    {labelKey: "navigation.projects", path: "/projects", icon: FolderKanban},
    {labelKey: "navigation.tasks", path: "/tasks", icon: CheckSquare},
    {labelKey: "navigation.reports", path: "/reports", icon: BarChart3},
    {labelKey: "navigation.settings", path: "/settings", icon: Settings},
];

export default function Sidebar({isOpen, onClose}) {
    const {t} = useTranslation();

    return (
        <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
            <div style={{position: "relative"}} className="sidebar-mobile-header">
                <div className="sidebar-logo">
                    <div className="logo-mark">O</div>
                    <div>
                        <h2>Oday</h2>
                        <span>Company OS</span>
                    </div>
                </div>

                {isOpen && (
                    <button className="icon-button mobile-only" onClick={onClose}>
                        <X size={20} />
                    </button>
                )}
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                        >
                            <Icon size={20} />
                            <span>{t(item.labelKey)}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}
