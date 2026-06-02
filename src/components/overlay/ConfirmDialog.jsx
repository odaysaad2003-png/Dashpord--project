import {AlertTriangle, Info, Trash2, X} from "lucide-react";
import "./confirmDialog.css";

const dialogIcons = {
    danger: Trash2,
    warning: AlertTriangle,
    info: Info,
};

export default function ConfirmDialog({
    isOpen,
    type = "danger",
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}) {
    if (!isOpen) return null;

    const Icon = dialogIcons[type] || AlertTriangle;

    return (
        <div className="confirm-overlay" onClick={onCancel}>
            <div className="confirm-panel" onClick={(event) => event.stopPropagation()}>
                <button className="confirm-close-button" onClick={onCancel}>
                    <X size={18} />
                </button>

                <div className={`confirm-icon confirm-icon-${type}`}>
                    <Icon size={26} />
                </div>

                <div className="confirm-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

                <div className="confirm-actions">
                    <button className="secondary-button" onClick={onCancel}>
                        {cancelLabel}
                    </button>

                    <button className={`confirm-button confirm-button-${type}`} onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
