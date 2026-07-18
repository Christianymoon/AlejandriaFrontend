import { Title } from "../components/header.jsx"
import { NormalButton } from "../components/buttons.jsx"
import { Modal, CentralModal } from "../components/modal.jsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"
import { addInventory } from "../api/Inventories.jsx"
import { getPublicationById, getAllPublications, deletePublication, getPublicationHistory } from "../api/Publications.jsx"
import { Message } from "../components/message.jsx"

export function Inventory() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const { User } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getAllPublications(User)
        setPublications(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPublications()
  }, [User])

  const filteredPublications = publications.filter(pub =>
    pub.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.type?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEdit = (pubId) => {
    navigate(`/inventory/${pubId}`)
  }

  const [history, setHistory] = useState([])
  const handleModal = async (pubId) => {
    if (showModal) {
      setShowModal(false);
      setHistory([]);
      return;
    }

    const data = await getPublicationHistory(User, pubId);

    setHistory(data ?? []);
    setShowModal(true);
  };

  return (
    <Title Name="Inventario">
      <div className="w-full px-6 py-4 flex flex-col gap-6">
        <CentralModal
          isOpen={showModal}
          OnClose={handleModal}
        >
          <div id="modalBody" className="w-full h-full overflow-x-hidden overflow-y-auto">
            {history.length > 0 ? (
              <table className="w-full w-full bg-[var(--surface)] text-[var(--text)] h-full table-fixed border-[var(--fg)] border-collapse">
                <caption className="text-sm font-bold p-2 bg-[var(--fg)] text-[var(--text)]">Historial de publicación</caption>
                <thead>
                  <tr>
                    <th className="text-sm bg-[var(--fg)] text-[var(--text)]">Cantidad</th>
                    <th className="text-sm bg-[var(--fg)] text-[var(--text)]">Disponible</th>
                    <th className="text-sm bg-[var(--fg)] text-[var(--text)]">Actualizado</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td className="text-sm py-4 text-center border-[var(--fg)]">
                        {item.total_quantity}
                      </td>

                      <td className="text-sm py-4 text-center border-[var(--fg)]">
                        {item.available_quantity}
                      </td>

                      <td className="text-sm py-4 text-center pr-2 border-[var(--fg)]">
                        {new Date(item.updated_at).toLocaleString("es-MX")}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            ) : (
              <div className="text-center text-[var(--text)] p-4">
                <h1>No hay historial disponible.</h1>
              </div>
            )}
          </div>
        </CentralModal>

        {/* Barra de búsqueda */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--fg)]/10 shadow-sm">
          <div className="relative flex-grow max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--text)] opacity-60">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por título, código o tipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--fg)]/20 rounded-xl text-sm focus:outline-none focus:border-[var(--fg)] focus:ring-1 focus:ring-[var(--fg)] bg-[var(--bg)]/30 text-[var(--text)]"
            />
          </div>
          <div className="text-right text-xs text-[var(--text)] opacity-70 font-semibold tracking-wider uppercase">
            Total publicaciones: <span className="text-[var(--fg)] text-sm font-black">{filteredPublications.length}</span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-[var(--danger-bg)] text-[var(--danger)] rounded-2xl border border-[var(--danger-border)]">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-[var(--text)] opacity-70 font-semibold">Cargando inventarios...</div>
        ) : (
          <div className="overflow-x-auto bg-[var(--surface)] rounded-2xl border border-[var(--fg)]/10 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--fg)] text-[var(--text)] text-[0.75rem] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4 rounded-tl-2xl">Título</th>
                  <th className="px-6 py-4">Código</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4 text-center">Disponible</th>
                  <th className="px-6 py-4 text-center">Total</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Última Actualización</th>
                  <th className="px-6 py-4">Historial</th>
                  <th className="px-6 py-4 text-right rounded-tr-2xl">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--fg)]/20 text-sm">
                {filteredPublications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center text-[var(--text)] opacity-70 italic">
                      No se encontraron inventarios
                    </td>
                  </tr>
                ) : (
                  filteredPublications.map((pub) => {
                    const hasInventory = !!pub.inventory
                    const available = pub.inventory?.available_quantity ?? 0
                    const total = pub.inventory?.total_quantity ?? 0

                    let statusBadge = null
                    if (!hasInventory) {
                      statusBadge = <span className="bg-[var(--surface-muted)] text-[var(--text)] opacity-70 text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--fg)]/10 whitespace-nowrap">Sin Inventario</span>
                    } else if (available === 0) {
                      statusBadge = <span className="bg-[var(--danger-bg)] text-[var(--danger)] text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--danger-border)] whitespace-nowrap">Agotado</span>
                    } else if (available <= 5) {
                      statusBadge = <span className="bg-[var(--warning-bg)] text-[var(--warning)] text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--warning-border)] whitespace-nowrap">Bajo Stock</span>
                    } else {
                      statusBadge = <span className="bg-[var(--success-bg)] text-[var(--fg)] text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--success-border)] whitespace-nowrap">Disponible</span>
                    }

                    return (
                      <tr key={pub.id} className="hover:bg-[var(--bg)]/10 transition-colors">
                        <td className="px-6 py-4 font-semibold text-[var(--text)] lora max-w-xs truncate" title={pub.name}>
                          {pub.name}
                        </td>
                        <td className="px-6 py-4 font-bold text-[var(--text)] opacity-70">{pub.code || "-"}</td>
                        <td className="px-6 py-4 text-[var(--text)] opacity-80">{pub.type || "-"}</td>
                        <td className="px-6 py-4 text-center font-bold text-[var(--text)]">{hasInventory ? available : "-"}</td>
                        <td className="px-6 py-4 text-center text-[var(--text)] opacity-70">{hasInventory ? total : "-"}</td>
                        <td className="px-6 py-4">{statusBadge}</td>
                        <td className="px-6 py-4 text-xs text-[var(--text)] opacity-60 font-medium">
                          {pub.inventory?.updated_at
                            ? new Date(pub.inventory.updated_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={async () => { handleModal(pub.id) }} className="bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--fg)]/90 hover:text-[var(--text)] transition-colors duration-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer">
                            Ver Historial
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleEdit(pub.id)}
                            className="bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--fg)]/90 hover:text-[var(--text)] transition-colors duration-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              {hasInventory ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              )}
                            </svg>
                            {hasInventory ? "Editar" : "Agregar"}
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Title >
  )
}

export function AddInventory() {
  const { id: publicationId } = useParams()
  const { User } = useAuth()
  const [total_quantity, setTotalQuantity] = useState(0)
  const [available_quantity, setAvailableQuantity] = useState(0)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [publication, setPublication] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getPublication = async () => {
      try {
        const pub = await getPublicationById(User, publicationId)
        setPublication(pub)
        setTotalQuantity(pub?.inventory?.total_quantity || 0)
        setAvailableQuantity(pub?.inventory?.available_quantity || 0)
      } catch (error) {
        setError(error.message)
      }
    }
    getPublication()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    const inventory = {
      total_quantity: total_quantity,
      available_quantity: available_quantity
    }

    try {
      await addInventory(User, publication, inventory)
      setMessage("Inventario agregado correctamente")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await deletePublication(User, publicationId)
      setMessage("Publicación eliminada correctamente")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <Modal isOpen={true} onClose={() => { navigate("/") }}>
        <h2 className="text-xl text-[var(--text)] ui font-bold mb-4">Agregar Inventario</h2>
        <Message error={error} message={message} />
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[var(--text)] text-sm font-bold mb-2" htmlFor="total_quantity">
              Cantidad Total
            </label>
            <input
              type="number"
              id="total_quantity"
              autoComplete="on"
              value={total_quantity}
              onChange={e => setTotalQuantity(e.target.value)}
              className="shadow ui appearance-none rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline bg-[var(--surface)]/80"
            />
          </div>
          <div className="mb-4">
            <label className="block lora text-[var(--text)] text-sm font-bold mb-2" htmlFor="available_quantity">
              Cantidad Disponible
            </label>
            <input
              type="number"
              id="available_quantity"
              autoComplete="on"
              value={available_quantity}
              onChange={e => setAvailableQuantity(e.target.value)}
              className="shadow ui appearance-none rounded-xl w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline bg-[var(--surface)]/80"
            />
          </div>
          <NormalButton text="Aceptar" onClick={handleSubmit} />
        </form>
        <div className="danger-zone">
          <NormalButton className="ui bg-[var(--danger)] text-[var(--text)] hover:text-[var(--bg)] my-6 px-3 py-2 rounded-lg cursor-pointer" text="Eliminar" onClick={handleDelete} />
        </div>
      </Modal>

    </div>
  )
}