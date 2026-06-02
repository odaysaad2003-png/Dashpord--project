import {CheckCircle2, AlertTriangle, Info, XCircle, X} from "lucide-react";

const toastIcons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

export default function ToastItem({toast, onRemove}) {
    const Icon = toastIcons[toast.type] || Info;

    return (
        <div className={`toast-item toast-${toast.type}`}>
            <div className="toast-icon">
                <Icon size={20} />
            </div>

            <div className="toast-content">
                <strong>{toast.title}</strong>
                {toast.message && <p>{toast.message}</p>}
            </div>

            <button className="toast-close" onClick={() => onRemove(toast.id)}>
                <X size={16} />
            </button>
        </div>
    );
}
