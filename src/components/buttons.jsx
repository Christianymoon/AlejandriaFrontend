import { Plus } from "lucide-react"

export function AddButton({ onClick }) {
    return (
        <button className="rounded-4xl text-white p-2 rounded cursor-pointer bg-[var(--fg)] hover:bg-[var(--fg)] hover:bg-opacity-80" onClick={onClick}>
            <Plus />
        </button>
    )
}