import { BrowserRouter, Routes, Route } from 'react-router'
import { ProtectedRoutes } from './protected.jsx'
import { useAuth } from './contexts/AuthContext.jsx'
import { Inventory, AddInventory } from './pages/inventory.jsx'
import { Publications, AddPublications } from './pages/publications.jsx'
import Navbar from './components/navbar.jsx'
import Users from './pages/users.jsx'
import LogIn from './pages/login.jsx'
import Me from './pages/me.jsx'

function App() {

  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated && <Route path="/login" element={<LogIn />} />}
        <Route element={<ProtectedRoutes IsAllowed={isAuthenticated} />}>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/me" element={<Me />} />
          <Route path='/' element={<Publications />}></Route>
          <Route path='/publications/add' element={<AddPublications />}></Route>
          <Route path='/inventory/:id' element={<AddInventory />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
