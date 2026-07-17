import { Title } from "../components/header.jsx"
import { useRef, useState, useEffect } from "react"
import { AddButton, NormalButton } from "../components/buttons.jsx"
import { useAuth } from "../contexts/AuthContext.jsx"
import { Message } from "../components/message.jsx"
import { CentralModal } from "../components/modal.jsx"
import { getRoles, getUsers, setUser } from "../api/Users.jsx"

export default function Users() {

    const { User } = useAuth()
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [msg, setMessage] = useState(null)
    const [Roles, setRoles] = useState([])
    const [isOpen, setOpenModal] = useState(false)

    // Form Inputs
    const [Username, setUsername] = useState("")
    const [Role, setRole] = useState("")
    const [Active, setActive] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers(User)
                setUsers(data)
            } catch (error) {
                setError(error.message)
            }
        }

        fetchUsers()
    }, [])

    useEffect(() => {
        const fetchRoles = async () => {
            const Roles = await getRoles()
            setRoles(Roles)
        }
        fetchRoles()
    }, [])

    const handleAddUser = async (e) => {
        if (isOpen) {
            setOpenModal(false)
        } else {
            setOpenModal(true)
        }
    }

    const addUser = async (e) => {
        e.preventDefault()

        const currentUser = {
            username: Username,
            role_id: Role,
            is_active: Active
        }

        console.log(currentUser)

        try {
            await setUser(User, currentUser)
            setMessage("Added User Successfully")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="mx-4">
            <Title Name="Usuarios">
                {error && <Message error={error} message={msg}></Message>}
                <AddButton onClick={handleAddUser}></AddButton>
                {users.length === 0 ? (<p className="rounded-xl flex text-[var(--fg)] items-center justify-center h-40">No hay usuarios activos</p>) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {users.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[var(--bg-secondary)] my-2 border border-[var(--fg)]/20 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-[var(--fg)]">
                                        {item.username}
                                    </h3>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.is_active
                                            ? "bg-green-500/20 text-green-500"
                                            : "bg-red-500/20 text-red-500"
                                            }`}
                                    >
                                        {item.is_active ? "Activo" : "Inactivo"}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Rol</span>
                                        <span className="font-medium">
                                            {item.role?.name ?? "Sin rol"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Publicaciones</span>
                                        <span className="font-medium">
                                            {item.total_publications}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <CentralModal isOpen={isOpen} OnClose={(e) => handleAddUser(e)}>
                    <form className="flex border-1 text-white bg-[var(--fg)] rounded-xl p-4 m-2 flex-col items-start justify-center" onSubmit={addUser}>
                        <div className="flex flex-col items-start justify-start">
                            <label className="py-2" htmlFor="username">Usuario</label>
                            <input
                                id="username"
                                className="mb-3 py-2 px-2 rounded-xl border-1"
                                autoComplete="on"
                                onChange={(e) => setUsername(e.target.value)}
                                value={Username}
                            />
                        </div>

                        <select className="mb-4 py-2 px-2 border-1 cursor-pointer rounded-xl" name="role" id="role" onChange={(e) => setRole(e.target.value)} value={Role}>
                            <option value="">Selecciona un Rol</option>

                            {Roles.length === 0 ? (
                                <option disabled>No hay roles disponibles</option>
                            ) : (
                                Roles.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))
                            )}
                        </select>
                        <div className="flex mb-4 flex-row items-center justify-center">
                            <label htmlFor="isactive">Activo</label>
                            <input className="w-10 cursor-pointer" type="checkbox" name="active" id="isactive" defaultChecked onChange={(e) => setActive(e.target.checked)} value={Active} />
                        </div>

                        <NormalButton text={'Agregar'}></NormalButton>
                    </form>
                </CentralModal>
            </Title >

        </div>
    )
}