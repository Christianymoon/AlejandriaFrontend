import { BookOpen, UserCircle2Icon, ListX, Menu, Boxes, Users, UserRound, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from "react-router";
import { useAuth } from '../contexts/AuthContext.jsx';
import { useEffect, useRef, useState } from 'react';


export default function Navbar() {

  const { User, Logout } = useAuth()
  const [navBarOpen, setNavbarOpen] = useState(false)
  const navigate = useNavigate()
  const navbarRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navBarOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbarOpen(false)
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setNavbarOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [navBarOpen])

  const goToProfile = async (e) => {
    e.preventDefault()
    navigate('/me')
  }

  const openNavbar = () => {
    setNavbarOpen((prev) => !prev)
  }

  const closeNavbar = () => setNavbarOpen(false)

  const handleLogout = () => {
    closeNavbar()
    Logout()
  }

  const navItems = [
    { to: '/', label: 'Publicaciones', icon: BookOpen, end: true },
    { to: '/inventory', label: 'Inventario', icon: Boxes },
    { to: '/users', label: 'Usuarios', icon: Users },
  ]

  const linkClass = ({ isActive }) => `flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-left ui text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-[var(--fg)] text-[var(--text)]'
      : 'text-[var(--text)] hover:bg-[var(--bg)]'
  }`

  return (
    <>
      <nav ref={navbarRef} className='navbar relative z-40 flex w-full flex-col items-center border-b-2 border-[var(--fg)]'>
        <div className="flex flex-row items-center w-full justify-between px-4 py-2">
          <div className='flex flex-row items-center gap-4 py-5'>
            <img src="/icon.png" alt="Alejandria" className="h-10 w-10 object-contain" />
            <span className='text-xl font-bold text-[var(--text)]'>Alejandria</span>
          </div>

          <div id="opened-icon" className="flex">
            <button
              type="button"
              onClick={openNavbar}
              aria-expanded={navBarOpen}
              aria-controls="mobile-navigation"
              aria-label={navBarOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text)] hover:bg-[var(--surface)]"
            >
              {navBarOpen ? <ListX size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
        <div className='flex w-full flex-row items-center gap-2 px-4 py-2'>
          <button type="button" onClick={goToProfile} aria-label="Abrir mi perfil" className="flex h-11 w-11 items-center justify-center rounded-xl">
            <UserCircle2Icon className='text-[var(--fg)]' size={25} />
          </button>
          <span className='ui text-sm text-[var(--text)]'>Bienvenid@ <span className='font-bold'>{User}</span></span>
        </div>

        {navBarOpen && (
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={closeNavbar}
            className="fixed inset-0 z-40 bg-black/60"
          />
        )}

        <div
          id="mobile-navigation"
          className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(86vw,360px)] flex-col bg-[var(--surface)] px-5 pb-6 pt-5 shadow-2xl transition-transform duration-300 ease-out ${navBarOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'}`}
          aria-hidden={!navBarOpen}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="ui text-lg font-bold text-[var(--text)]">Menú</span>
            <button type="button" onClick={closeNavbar} aria-label="Cerrar menú" className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text)] hover:bg-[var(--bg)]">
              <ListX size={25} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass} onClick={closeNavbar}>
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
            <NavLink to="/me" className={linkClass} onClick={closeNavbar}>
              <UserRound size={20} />
              Mi perfil
            </NavLink>
          </div>
          <button type="button" onClick={handleLogout} className="mt-auto flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-left ui text-sm font-semibold text-[var(--danger)] hover:bg-[var(--bg)]">
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </nav>
      <nav aria-label="Navegación principal" className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[var(--fg)]/30 bg-[var(--surface)]/95 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur md:hidden">
        {navItems.concat({ to: '/me', label: 'Perfil', icon: UserRound }).map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex min-h-14 min-w-16 flex-col items-center justify-center gap-1 px-2 text-[0.68rem] ui font-semibold transition-colors ${isActive ? 'text-[var(--fg)]' : 'text-[var(--text)]/70'}`}>
            <Icon size={21} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}