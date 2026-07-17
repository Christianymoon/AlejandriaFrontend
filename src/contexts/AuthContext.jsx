import { createContext, useState, useContext } from "react"

const BASE_URL = import.meta.env.VITE_API_URL

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [User, setUser] = useState(() => localStorage.getItem("access_token") || null)

    const Login = async (username, password) => {
        try {
            let params = new URLSearchParams()
            params.append("username", username)
            params.append("password", password)


            const response = await fetch(BASE_URL + "/token", {
                method: "POST",
                body: params,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.detail)
            }

            localStorage.setItem("access_token", data.access_token)
            setUser(data.access_token)


        } catch (error) {
            throw new Error(error.message)

        }

    }
    const Logout = () => {
        setUser(null)
        localStorage.removeItem("access_token")
    }

    return (
        <AuthContext.Provider value={{
            User,
            Login,
            Logout,
            isAuthenticated: !!User
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}