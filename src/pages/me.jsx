import { useNavigate } from "react-router"
import { Title } from "../components/header.jsx"
import { useAuth } from "../contexts/AuthContext.jsx"
import { LogOut } from 'lucide-react'

export default function Me() {
  const { User, Logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await Logout()
    } catch (e) {
      // ignore
    }
    navigate('/')
  }

  const initials = (User || 'U').split(' ').map(n => n?.[0] ?? '').slice(0,2).join('').toUpperCase()

  return (
    <Title Name="Mi Perfil">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--fg)]/10 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--fg)] text-[var(--text)] text-xl font-bold">
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[var(--text)]">{User}</h2>
              <p className="text-[var(--text)]/70 mt-1 text-sm">Miembro del sistema</p>
              <div className="mt-3 flex gap-2">
                <button onClick={handleLogout} className="flex cursor-pointer items-center gap-2 bg-[var(--danger)] text-[var(--text)] px-3 py-1 text-sm rounded-md hover:opacity-90">
                  <LogOut size={14} />
                  <span>Salir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Title>
  )
}

