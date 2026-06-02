import {createContext, useContext, useState} from "react";
import ToastContainer from "../components/feedback/toast/ToastContainer";

const ToastContext = createContext(null);

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);

    function showToast({type = "info", title, message}) {
        const id = crypto.randomUUID();

        const newToast = {
            id,
            type,
            title,
            message,
        };

        setToasts((currentToasts) => [newToast, ...currentToasts]);

        setTimeout(() => {
            removeToast(id);
        }, 3500);
    }

    function removeToast(id) {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }

    return (
        <ToastContext.Provider value={{showToast, removeToast}}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}
