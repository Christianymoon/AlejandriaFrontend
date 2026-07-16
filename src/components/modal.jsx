import { X } from "lucide-react";

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="flex flex-col inset-0 flex items-center justify-center z-50 bg-[var(--bg)] bg-opacity-90">
            <div className="close-button">
                <X onClick={onClose} className="cursor-pointer my-10 hover:text-[var(--fg)]" size={30} />
            </div>
            <div className="modal">
                {children}
            </div>
        </div>
    )

}