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


export function CentralModal({ isOpen, OnClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="absolute border-1 border-[var(--fg)] rounded-2xl left-[5%] top-[30%] flex-col flex w-[90%] h-[30%] items-center justify-center z-50 bg-[var(--bg)]">
            <div className="flex w-full h-[20%]">
                <button className="w-full rounded-xl h-full text-[24px] cursor-pointer" onClick={OnClose}>X</button>
            </div>
            <div className="modal w-full h-[80%]">

                {children}
            </div>
        </div>
    )
}