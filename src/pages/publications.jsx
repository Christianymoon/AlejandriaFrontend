import { useState, useEffect } from "react"
import { getAllPublications } from "../api/Publications"
import { useAuth } from "../contexts/AuthContext"

export default function Publications() {

    const [publications, setPublications] = useState([])
    const [className, setName] = useState("")
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [type, setType] = useState("")
    const [code, setCode] = useState("")
    const [error, setError] = useState(null)
    const { User } = useAuth()

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

    const handleSetPublication = () => {
        console.log("A")
        addPublication(User, {
            name: "",
            year: "",
            month: "",
            type: "",
            code: ""
        })
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mx-10 w-fit p-3">Publicaciones</h1>
            <span className="" onClick={handleSetPublication}>Agregar Publicacion</span>
            {error && <div>{error}</div>}
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th>ID</th>
                        <th>Título</th>
                        <th>Año</th>
                        <th>Mes</th>
                        <th>ISBN</th>
                        <th>Tipo</th>
                        <th>Código</th>
                    </tr>
                </thead>
                <tbody>
                    {publications.map((publication) => (
                        <tr key={publication.id}>
                            <td>{publication.id}</td>
                            <td>{publication.name}</td>
                            <td>{publication.year}</td>
                            <td>{publication.month}</td>
                            <td>{publication.isbn}</td>
                            <td>{publication.type}</td>
                            <td>{publication.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}