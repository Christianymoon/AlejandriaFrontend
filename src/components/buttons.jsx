import { Plus } from "lucide-react"

export function AddButton({ onClick }) {
    return (
        <button className="rounded-4xl text-white p-2 rounded cursor-pointer bg-[var(--fg)] hover:bg-[var(--fg)] hover:bg-opacity-80" onClick={onClick}>
            <Plus />
        </button>
    )
}


export function NormalButton({
    text,
    className,
    disabled,
    onClick,
}) {
    return (
        <button className={className || `bg-[var(--fg)] ui text-[var(--text)] hover:text-black px-4 py-2 rounded-lg cursor-pointer`} onClick={onClick}>
            {text}
        </button>
    )
}