import ToastItem from "./ToastItem";
import "./toast.css";

export default function ToastContainer({toasts, onRemove}) {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
}
