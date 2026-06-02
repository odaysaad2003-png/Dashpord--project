import {Search, Bell, Moon, Sun, Menu, LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {useTheme} from "../../context/ThemeContext";
import {useAuth} from "../../context/AuthContext";
import {useToast} from "../../context/ToastContext";

import "../../styles/layouts/navbar.css";

export default function Navbar({onMenuClick}) {
    
const {themeMode, toggleTheme, themeModes} = useTheme();
const {t} = useTranslation();

const navigate = useNavigate();
const {user, logout} = useAuth();
const {showToast} = useToast();

function handleLogout() {
    logout();

    showToast({
        type: "success",
        title: "Logged out",
        message: "You have been logged out successfully.",
    });

    navigate("/login");
}

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="icon-button menu-toggle-button" onClick={onMenuClick}>
                    <Menu size={20} />
                </button>

                <div className="header-info">
                    <h1>{t("navbar.title")}</h1>
                    <p>{t("navbar.description")}</p>
                    {/* <p>Manage your company operations in one place</p> */}
                </div>
            </div>

            <div className="navbar-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder={t("navbar.search")} />
                </div>

                <button className="icon-button" onClick={toggleTheme}>
                    {themeMode === themeModes.DARK ? <Sun style={{color: "yellow"}} size={18} /> : <Moon size={18} />}
                </button>

                <button className="icon-button">
                    <Bell size={18} />
                </button>

                {/* <div className="user-profile">
                    <div className="avatar">A</div>
                    <div>
                        <strong>{t("navigation.maniger")}</strong>
                    </div>
                </div> */}
                <div className="navbar-user">
                    <div>
                        <strong>{user?.name}</strong>
                        <span>{user?.role}</span>
                    </div>

                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
