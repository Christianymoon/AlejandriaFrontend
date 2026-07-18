import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"
import { Message } from "../components/message.jsx"

export default function LogIn() {

    const navigate = useNavigate()
    const { Login, isAuthenticated } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
            <div className="login ui h-screen border-1 border-[var(--fg)] flex flex-col items-center justify-center gap-4 p-4 bg-[var(--bg)]">
                <h1 className="text-4xl lora text-[var(--text)]">Alejandria</h1>
                <input
                    className="border-2 rounded-2xl w-full border-[var(--fg)] p-4  rounded bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text)]/70"
                    type="text"
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="border-2 rounded-2xl w-full border-[var(--fg)] p-4  rounded bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text)]/70"
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-[var(--fg)] rounded-2xl w-full text-[var(--text)] p-4  rounded cursor-pointer transition-all ease-in-out hover:bg-[var(--fg)]/90">
                    Iniciar Sesión
                </button>
            </div>

        </form>
    )
}