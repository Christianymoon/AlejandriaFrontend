import { createContext, useState, useContext } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [User, setUser] = useState(() => localStorage.getItem("access_token") || null)
    const Login = async (username, password) => {
        try {
            let params = new URLSearchParams()
            params.append("username", username)
            params.append("password", password)


            const response = await fetch("api/token", {
                method: "POST",
                body: params,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })

            const data = await response.json()
            localStorage.setItem("access_token", data.access_token)
            setUser(data.access_token)
            return true

        } catch (error) {
            return false
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