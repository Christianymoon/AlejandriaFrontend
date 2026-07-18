import { BookOpen, UserCircle2Icon, ListX, ListIcon } from 'lucide-react'
import { Link } from "react-router";
import { useAuth } from '../contexts/AuthContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';


export default function Navbar() {

  const { User, Logout } = useAuth()
  const [navBarOpen, setNavbarOpen] = useState(false)
  const navigate = useNavigate()

  const goToProfile = async (e) => {
    e.preventDefault()
    navigate('/me')
  }

  const openNavbar = () => {
    setNavbarOpen((prev) => !prev)
  }

  return (
    <>
      <nav className='navbar flex flex-col justify-around items-center w-full h-auto border-b-2 border-[var(--fg)]'>
        <div className="flex flex-row items-center w-full justify-between px-4 py-2">
          <div className='flex flex-row items-center gap-4 py-5'>
            <BookOpen className='text-white bg-[var(--fg)] rounded-[50px] p-2' size={40} />
            <span className='text-xl font-bold text-[var(--text)]'>Alejandria</span>
          </div>

          <div id="opened-icon" className="flex">
            <ListIcon id="navbar-toggle" onClick={openNavbar} className='z-12 text-[var(--text)] cursor-pointer hover:text-[var(--text)]' size={25} />
          </div>
        </div>
        <div className='flex w-full flex-row items-center px-4 py-2 gap-2'>
          <button type="submit" onClick={goToProfile}>
            <UserCircle2Icon className='cursor-pointer text-[var(--fg)] hover:text-black' size={25} />
          </button>
          <span className='ui text-[var(--text)]'>Bienvenid@ <span className='font-bold text-[var(--text)]'>{User}</span></span>

        </div>
        <div className={`routes z-11 fixed right-0 flex flex-col justify-center items-center top-0 h-full w-1/2 bg-[var(--surface)] border-2 border-[var(--fg)] rounded-l-2xl px-4 py-2 transition-transform duration-300 ease-out ${navBarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
        md:w-1/4 `}>
          <Link className='cursor-pointer border-1 w-full text-center mb-4 rounded-xl p-2 bg-[var(--fg)] text-[var(--text)] hover:text-[var(--surface)] border-[var(--fg)]' to="/">Publicaciones</Link>
          <Link className='cursor-pointer border-1 w-full text-center mb-4 rounded-xl p-2 bg-[var(--fg)] text-[var(--text)] hover:text-[var(--surface)] border-[var(--fg)]' to="/inventory">Inventario</Link>
          <Link className='cursor-pointer border-1 w-full text-center mb-4 rounded-xl p-2 bg-[var(--fg)] text-[var(--text)] hover:text-[var(--surface)] border-[var(--fg)]' to="/users">Usuarios</Link>
        </div>
      </nav>

    </>
  )
}