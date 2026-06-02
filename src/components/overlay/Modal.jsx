import {X} from "lucide-react";
import "./modal.css";

export default function Modal({isOpen, title, description, children, onClose}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h3>{title}</h3>
                        {description && <p>{description}</p>}
                    </div>

                    <button className="modal-close-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}
