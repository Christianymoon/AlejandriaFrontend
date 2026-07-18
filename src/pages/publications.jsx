import { useState, useEffect } from "react"
import { getAllPublications, setPublication } from "../api/Publications.jsx"
import { useAuth } from "../contexts/AuthContext.jsx"
import { AddButton, NormalButton } from "../components/buttons.jsx"
import { Modal } from "../components/modal.jsx"
import { useNavigate } from "react-router"
import { Title } from "../components/header.jsx"
import Cards from "../components/cards.jsx"
import { Message } from "../components/message.jsx"


export function Publications() {
    const [publications, setPublications] = useState([])
    const [error, setError] = useState(null)
    const { User } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchPublications = async () => {
            const data = await getAllPublications(User)
            if (data.error) {
                setError(data.error)
            } else {
                setPublications(data)
            }
        }
        fetchPublications()
    }, [])

    const navigateToAddPublication = () => {
        navigate("/publications/add")
    }

    return (

        <Title Name="Publicaciones" >
            <div className="MiniPanel w-full px-4 py-2">
                <AddButton onClick={navigateToAddPublication} />
            </div>
            <Message error={error} />
            <Cards publications={publications} />
        </Title >
    )
}

export function AddPublications() {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [type, setType] = useState("")
    const [code, setCode] = useState("")
    const { User } = useAuth()

    const returnToPublications = () => {
        navigate("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const publication = {
            name: name,
            year: year,
            month: month,
            type: type,
            code: code
        }

        const data = await setPublication(User, publication)
        if (data.error) {
            alert("Error al agregar la publicación: " + data.error)
        } else {
            alert("Publicación agregada correctamente")
        }
    }


    return (
        <>
            <Modal isOpen={true} onClose={returnToPublications}>
                <h2 className="text-xl ui text-[var(--text)] font-bold mb-4">Agregar Publicación</h2>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[var(--text)] text-sm font-bold mb-2" htmlFor="name">
                            Título
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            autoComplete="on"
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none bg-[var(--surface)] rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[var(--text)] text-sm font-bold mb-2" htmlFor="year">
                            Año
                        </label>
                        <input
                            type="number"
                            id="year"
                            value={year}
                            autoComplete="on"
                            onChange={(e) => setYear(e.target.value)}
                            className="shadow appearance-none bg-[var(--surface)] rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[var(--text)] text-sm font-bold mb-2" htmlFor="month">
                            Mes
                        </label>
                        <input
                            type="number"
                            id="month"
                            value={month}
                            autoComplete="on"
                            onChange={(e) => setMonth(e.target.value)}
                            className="shadow appearance-none bg-[var(--surface)] rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[var(--text)] text-sm font-bold mb-2" htmlFor="type">
                            Tipo
                        </label>
                        <input
                            type="text"
                            id="type"
                            autoComplete="on"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="shadow appearance-none bg-[var(--surface)] rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[var(--text)] text-sm font-bold mb-2" htmlFor="code">
                            Código
                        </label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            autoComplete="on"
                            onChange={(e) => setCode(e.target.value)}
                            className="shadow appearance-none bg-[var(--surface)] rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <NormalButton text="Agregar" onClick={handleSubmit} />
                </form>
            </Modal>
        </>
    )
}