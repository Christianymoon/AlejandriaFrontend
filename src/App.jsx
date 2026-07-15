import { BrowserRouter, Routes, Route } from 'react-router'
import Inventory from './pages/Inventory'
import Users from './pages/Users'
import Movements from './pages/Movements'
import Publications from './pages/Publications'
import Navbar from './components/navbar.jsx'
import Login from './pages/login.jsx'
import { ProtectedRoutes } from './protected.jsx'
import { useAuth } from './contexts/AuthContext.jsx'

function App() {

  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated && <Route path="/login" element={<Login />} />}
        <Route element={<ProtectedRoutes IsAllowed={isAuthenticated} />}>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/movements" element={<Movements />} />
          <Route path='/' element={<Publications />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
