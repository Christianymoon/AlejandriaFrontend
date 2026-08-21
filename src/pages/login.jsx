import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"
import { Message } from "../components/message.jsx"

export default function LogIn() {

    const navigate = useNavigate()
    const { Login, isAuthenticated } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault()

        if (username === "" || password === "") {
            setError("Todos los campos son obligatorios")
            return
        }

        try {
            await Login(username, password)
            navigate('/')

        } catch (error) {
            setError(error.message)
        }

    }

    return (

        <form onSubmit={handleLogin}>
            <Message error={error} message={message} />
            <div className="login ui h-screen border-[var(--fg)] flex flex-col items-center justify-center gap-4 p-4 bg-[var(--bg)]
            md:w-1/2 md:mx-auto md:border-0 lg:w-1/4 lg:mx-auto lg:border-0">
                <img src="/icon.png" alt="Alejandria" className="h-24 w-24 object-contain" />
                <h1 className="text-2xl lora text-[var(--text)]">Alejandria</h1>
                <input
                    className="w-full rounded-2xl border-2 border-[var(--fg)]/30 bg-[var(--bg)]/80 p-4 text-[var(--text)] shadow-sm outline-none transition-all duration-200 placeholder:text-[var(--text)]/60 hover:border-[var(--fg)]/60 focus:border-[var(--fg)] focus:ring-4 focus:ring-[var(--fg)]/10"
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="relative w-full z-11">
                    <input
                        className="w-full rounded-2xl border-2 border-[var(--fg)]/30 bg-[var(--bg)]/80 p-4 pr-20 text-[var(--text)] shadow-sm outline-none transition-all duration-200 placeholder:text-[var(--text)]/60 hover:border-[var(--fg)]/60 focus:border-[var(--fg)] focus:ring-4 focus:ring-[var(--fg)]/10"
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text)]/70 hover:text-[var(--text)]"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
                <button
                    className="bg-[var(--fg)] rounded-2xl w-full text-[var(--text)] p-4  rounded cursor-pointer transition-all ease-in-out hover:bg-[var(--fg)]/90">
                    Iniciar Sesión
                </button>
            </div>

        </form>
    )
}