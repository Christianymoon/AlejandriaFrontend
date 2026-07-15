import { LibraryBig, UserCircle2Icon, ListX, ListIcon } from 'lucide-react'
import { Link } from "react-router";
import { useAuth } from '../contexts/AuthContext.jsx';
import { useState } from 'react';

export default function Navbar() {

    const { User, Logout } = useAuth()
    const [navBarOpen, setNavbarOpen] = useState(false)

    const handleLogout = async (e) => {
        e.preventDefault()
        await Logout()
    }

    const openNavbar = () => {

        const routes = document.querySelector('.routes')

        if (navBarOpen) {
            routes.classList.add('hidden')
            setNavbarOpen(false)
        } else {
            routes.classList.remove('hidden')
            setNavbarOpen(true)
        }

    }

    return (
        <>
            <nav className='navbar flex flex-col justify-around items-center w-full h-auto border-b-2 border-black'>

                <div className="flex flex-row items-center w-full justify-between px-4 py-2">
                    <div className='flex flex-row items-center gap-4 py-5'>
                        <LibraryBig className='text-white bg-[var(--fg)] rounded-[50px] p-2' size={40} />
                        <span className='text-xl font-bold'>Alejandria</span>
                    </div>

                    <div id="opened-icon" className="flex">
                        <ListIcon id="navbar-toggle" onClick={openNavbar} className='z-12 cursor-pointer hover:text-black' size={25} />
                    </div>
                </div>

                <div className='flex w-full flex-row items-center px-4 py-2 gap-2'>
                    <button type="submit" onClick={handleLogout}>
                        <UserCircle2Icon className='cursor-pointer text-[var(--fg)] hover:text-black' size={25} />
                    </button>
                    <span className=''>Bienvenido <span className='font-bold uppercase'>{User}</span></span>

                </div>




                <div className='routes z-11 flex justify-center flex-col gap-4 text-lg fixed right-0 top-0 h-full w-1/2 bg-[var(--fg)] text-white px-4 py-2 hidden'>
                    <Link className='cursor-pointer text-[var(--bg)] hover:text-black' to="/">Publicaciones</Link>
                    <Link className='cursor-pointer text-[var(--bg)] hover:text-black' to="/inventory">Inventario</Link>
                    <Link className='cursor-pointer text-[var(--bg)] hover:text-black' to="/users">Usuarios</Link>
                    <Link className='cursor-pointer text-[var(--bg)] hover:text-black' to="/movements">Movimientos</Link>
                </div>


            </nav>

        </>
    )
}