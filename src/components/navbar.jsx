import { LibraryBig, UserCircle2Icon } from 'lucide-react'
import { Link } from "react-router";
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {

    const { User, Logout } = useAuth()

    const handleLogout = async (e) => {
        e.preventDefault()
        await Logout()
    }

    return (
        <>
            <nav className='navbar flex flex-row justify-around items-center w-full h-[80px] border-b-2 border-black'>
                <div className='flex flex-row items-center gap-4 '>
                    <LibraryBig className='text-white bg-green-600 rounded-[50px] p-2' size={40} />
                    <span className='text-2xl'>Alejandria</span>
                </div>


                <div className='routes flex gap-4'>
                    <Link className='cursor-pointer hover:text-green-600' to="/">Publicaciones</Link>
                    <Link className='cursor-pointer hover:text-green-600' to="/inventory">Inventario</Link>
                    <Link className='cursor-pointer hover:text-green-600' to="/users">Usuarios</Link>
                    <Link className='cursor-pointer hover:text-green-600' to="/movements">Movimientos</Link>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <span>Bienvenido {User}</span>
                    <button type="submit" onClick={handleLogout}>
                        <UserCircle2Icon className='cursor-pointer hover:text-green-600' size={25} />
                    </button>
                </div>
            </nav>

        </>
    )
}