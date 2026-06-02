import {useState} from "react";
import {User, Palette, Shield, Bell, Globe, Monitor, Smartphone, Save} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/ui/SectionCard";


import {useTheme} from "../../context/ThemeContext";
// import {useLanguage} from "../../context/LanguageContext
// ";

import {useTranslation} from "react-i18next";
import {useAppLanguage} from "../../hooks/useAppLanguage";


import "./settings.css";

function SettingsPage() {

const {themeMode, setThemeMode, themeModes} = useTheme();
const {t} = useTranslation();
const {language, changeLanguage} = useAppLanguage();

    const [settings, setSettings] = useState({
        fullName: "Oday saad",
        email: "odaysaad2003@gmail.com",
        role: "Company Manager",
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: false,
        twoFactorAuth: true,
    });

    function updateSetting(key, value) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    }

    function handleSave() {
        console.log("Saved settings:", settings);
    }

    return (
        <>
            <PageHeader
                title={t("settings.title")}
                description={t("settings.description")}
                actionLabel={t("settings.saveChanges")}
                onAction={handleSave}
            />

            <div className="settings-layout">
                <div className="settings-main">
                    <SectionCard title="Profile Settings">
                        <div className="settings-section-header">
                            <div className="settings-icon blue">
                                <User size={20} />
                            </div>
                            <div>
                                <h4>Personal Information</h4>
                                <p>Update your basic account details.</p>
                            </div>
                        </div>

                        <div className="settings-form-grid">
                            <div className="settings-field">
                                <label>Full Name</label>
                                <input
                                    value={settings.fullName}
                                    onChange={(e) => updateSetting("fullName", e.target.value)}
                                />
                            </div>

                            <div className="settings-field">
                                <label>Email Address</label>
                                <input
                                    value={settings.email}
                                    onChange={(e) => updateSetting("email", e.target.value)}
                                />
                            </div>

                            <div className="settings-field full-width">
                                <label>Role</label>
                                <input value={settings.role} onChange={(e) => updateSetting("role", e.target.value)} />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Preferences">
                        <div className="settings-section-header">
                            <div className="settings-icon purple">
                                <Palette size={20} />
                            </div>
                            <div>
                                <h4>Appearance and Localization</h4>
                                <p>Control the system language and visual mode.</p>
                            </div>
                        </div>

                        <div className="settings-options-grid">
                            <div className="preference-card">
                                <Globe size={22} />
                                <div>
                                    <strong>Language</strong>
                                    <span>Choose your interface language.</span>
                                </div>

                                <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
                                    <option value="en">{t("settings.english")}</option>
                                    <option value="ar">{t("settings.arabic")}</option>
                                </select>
                            </div>

                            <div className="preference-card">
                                <Monitor size={22} />
                                <div>
                                    <strong>Theme Mode</strong>
                                    <span>Use light, dark, or system theme.</span>
                                </div>

                                <select value={themeMode} onChange={(e) => setThemeMode(e.target.value)}>
                                    <option value={themeModes.LIGHT}>Light</option>
                                    <option value={themeModes.DARK}>Dark</option>
                                    <option value={themeModes.SYSTEM}>System</option>
                                </select>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Notifications">
                        <div className="settings-section-header">
                            <div className="settings-icon orange">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h4>Notification Preferences</h4>
                                <p>Choose what updates you want to receive.</p>
                            </div>
                        </div>

                        <div className="settings-list">
                            <SettingToggle
                                title="Email Notifications"
                                description="Receive important updates by email."
                                checked={settings.emailNotifications}
                                onChange={(value) => updateSetting("emailNotifications", value)}
                            />

                            <SettingToggle
                                title="Push Notifications"
                                description="Get instant alerts inside the dashboard."
                                checked={settings.pushNotifications}
                                onChange={(value) => updateSetting("pushNotifications", value)}
                            />

                            <SettingToggle
                                title="Weekly Reports"
                                description="Receive weekly performance summaries."
                                checked={settings.weeklyReports}
                                onChange={(value) => updateSetting("weeklyReports", value)}
                            />
                        </div>
                    </SectionCard>

                    <SectionCard title="Security">
                        <div className="settings-section-header">
                            <div className="settings-icon green">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4>Account Security</h4>
                                <p>Protect your account and company data.</p>
                            </div>
                        </div>

                        <div className="settings-list">
                            <SettingToggle
                                title="Two-Factor Authentication"
                                description="Require a second verification step when signing in."
                                checked={settings.twoFactorAuth}
                                onChange={(value) => updateSetting("twoFactorAuth", value)}
                            />

                            <div className="security-action">
                                <div>
                                    <strong>Password</strong>
                                    <span>Last changed 21 days ago.</span>
                                </div>

                                <button className="secondary-button">Change Password</button>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                <aside className="settings-sidebar">
                    <SectionCard title="Account Summary">
                        <div className="account-summary">
                            <div
                                style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                                className="img"
                            >
                                <img src="../../../public/portfolio-modified.png" width={120} alt="" />
                            </div>
                            <h4>{settings.fullName}</h4>
                            <p>{settings.email}</p>
                            <span>{settings.role}</span>
                        </div>
                    </SectionCard>

                    <SectionCard title="System Info">
                        <div className="system-info-list">
                            <InfoItem label="Plan" value="Business Pro" />
                            <InfoItem label="Workspace" value="Nexora HQ" />
                            <InfoItem label="Language" value={settings.language} />
                            <InfoItem label="Theme" value={settings.theme} />
                            <InfoItem label="Devices" value="3 Active" />
                        </div>
                    </SectionCard>

                    <button className="save-settings-button" onClick={handleSave}>
                        <Save size={18} />
                        Save All Changes
                    </button>
                </aside>
            </div>
        </>
    );
}

function SettingToggle({title, description, checked, onChange}) {
    return (
        <div className="setting-toggle-row">
            <div>
                <strong>{title}</strong>
                <span>{description}</span>
            </div>

            <button
                className={checked ? "toggle-switch active" : "toggle-switch"}
                onClick={() => onChange(!checked)}
                type="button"
            >
                <span />
            </button>
        </div>
    );
}

function InfoItem({label, value}) {
    return (
        <div className="info-item">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

export default SettingsPage;
