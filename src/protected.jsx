import { Outlet, Navigate } from "react-router"


export function ProtectedRoutes({ IsAllowed, redirectTo = '/login' }) {
    if (IsAllowed) {
        return <Outlet />
    }
    return <Navigate to={redirectTo} />
}