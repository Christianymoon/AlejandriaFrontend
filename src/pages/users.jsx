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
        {users.length === 0 ? (<p className="rounded-xl flex text-[var(--text)] items-center justify-center h-40">No hay usuarios activos</p>) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {users.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--surface)] my-2 border border-[var(--fg)]/20 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    {item.username}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.is_active
                      ? "bg-[var(--fg)]/20 text-[var(--fg)]"
                      : "bg-[var(--danger-bg)] text-[var(--danger)]"
                      }`}
                  >
                    {item.is_active ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-[var(--text)]/80">
                  <div className="flex justify-between">
                    <span>Rol</span>
                    <span className="font-medium uppercase text-[var(--text)]">
                      {item.role?.name ?? "Sin rol"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Publicaciones</span>
                    <span className="font-medium text-[var(--text)]">
                      {item.total_publications}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <CentralModal isOpen={isOpen} OnClose={(e) => handleAddUser(e)}>
          <form className="w-full max-w-md bg-[var(--surface)] border border-[var(--fg)]/20 rounded-3xl shadow-2xl p-6 mx-auto space-y-6 text-[var(--text)]" onSubmit={addUser}>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Agregar Usuario</h2>
              <p className="text-sm text-[var(--text)]/70">Completa los datos para crear un nuevo usuario en el sistema.</p>
            </div>

            <div className="grid gap-4">
              <label className="block text-sm font-semibold text-[var(--text)]" htmlFor="username">Usuario</label>
              <input
                id="username"
                className="w-full rounded-2xl border border-[var(--fg)]/20 bg-[var(--bg)]/85 py-3 px-4 text-[var(--text)] outline-none transition focus:border-[var(--fg)] focus:ring-2 focus:ring-[var(--fg)]/30"
                autoComplete="on"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
              />
            </div>

            <div className="grid gap-4">
              <label className="block text-sm font-semibold text-[var(--text)]" htmlFor="role">Rol</label>
              <select className="w-full rounded-2xl border border-[var(--fg)]/20 bg-[var(--bg)]/85 py-3 px-4 text-[var(--text)] outline-none transition focus:border-[var(--fg)] focus:ring-2 focus:ring-[var(--fg)]/30" name="role" id="role" onChange={(e) => setRole(e.target.value)} value={Role}>
                <option value="">Selecciona un Rol</option>
                {Roles.length === 0 ? (
                  <option disabled>No hay roles disponibles</option>
                ) : (
                  Roles.map((item) => (
                    <option key={item.id} value={item.id} className="bg-[var(--bg)] text-[var(--text)]">
                      {item.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input className="h-5 w-5 rounded border border-[var(--fg)]/30 bg-[var(--bg)] text-[var(--text)] accent-[var(--fg)]" type="checkbox" name="active" id="isactive" defaultChecked onChange={(e) => setActive(e.target.checked)} value={Active} />
              <label className="text-sm text-[var(--text)]" htmlFor="isactive">Activo</label>
            </div>

            <NormalButton className="w-full bg-[var(--fg)] text-[var(--text)] hover:bg-[var(--fg)]/90" text={'Agregar'}></NormalButton>
          </form>
        </CentralModal>
      </Title >

    </div>
  )
}