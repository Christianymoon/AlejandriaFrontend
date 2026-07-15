import { createContext, useState } from "react"
import { useContext } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [User, setUser] = useState(() => localStorage.getItem("access_token") || null)

    const Login = async (username, password) => {

        try {
            let params = new URLSearchParams()
            params.append("username", username)
            params.append("password", password)


            const response = await fetch("api/auth/token", {
                method: "POST",
                body: params,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })

            const data = await response.json()
            localStorage.setItem("access_token", data.access_token)
            setUser(data.access_token)

        } catch (error) {
            console.log(error)
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

export const useAuth = () => useContext(AuthContext)