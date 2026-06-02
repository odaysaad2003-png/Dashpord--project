
import {Search, Bell, Moon, Sun, Menu} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import "../../styles/layouts/navbar.css"

import {useTranslation} from "react-i18next";
// import {useLanguage} from "../../context/LanguageContext";

export default function Navbar({onMenuClick}) {


const {themeMode, toggleTheme, themeModes} = useTheme();

const {t} = useTranslation();


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

                <div className="user-profile">
                    <div className="avatar">A</div>
                    <div>
                        <strong>{t("navigation.maniger")}</strong>
                        
                    </div>
                </div>
            </div>
        </header>
    );
}
