import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"

export default function Login() {

    const navigate = useNavigate()
    const { Login, isAuthenticated } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault()

        if (username === "" || password === "") {
            setError("Todos los campos son obligatorios")
            return
        }
        try {
            const success = await Login(username, password)
            if (!success) {
                setError("Credenciales incorrectas")
            }
            navigate('/')
        } catch (error) {
            setError("Error al iniciar sesión")
        }

    }

    return (

        <form onSubmit={handleLogin}>

            <div className="login h-screen flex flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-4xl text-black">Alejandria</h1>

                <input
                    className="border-2 rounded-2xl border-black p-4 w-96 rounded"
                    type="text"
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="border-2 rounded-2xl border-black p-4 w-96 rounded"
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="bg-[var(--fg)] rounded-2xl text-white p-4 w-96 rounded cursor-pointer transition-all ease-in-out">
                    Iniciar Sesión
                </button>

                {error && <span className="text-red-500 text-bold">{error}</span>}

            </div>

        </form>
    )
}