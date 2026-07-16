import { Title } from "../components/header.jsx"
import { AddButton } from "../components/buttons.jsx"
import { Modal } from "../components/modal.jsx"
import { addInventory } from "../api/Inventories.jsx"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"

export function Inventory() {
  return (
    <Title Name="Inventario" >
      <div className="MiniPanel w-full px-4 py-2">
        <AddButton onClick={() => { }} />
      </div>
    </Title>
  )
}

export function AddInventory() {
  const { id: publicationId } = useParams()
  const [total_quantity, setTotalQuantity] = useState(0)
  const [available_quantity, setAvailableQuantity] = useState(0)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  console.log(publicationId)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const inventory = {
      total_quantity: total_quantity,
      available_quantity: available_quantity
    }

    const res = await addInventory(publicationId, inventory)
    if (res.error) {
      setError(res.error)
    }
  }

  return (
    <div>
      <Modal isOpen={true} onClose={() => { navigate("/") }}>
        <h2 className="text-xl font-bold mb-4">Agregar Inventario a la Publicación: {publicationId}</h2>
        {error && <div>{error}</div>}
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_quantity">
              Cantidad Total
            </label>
            <input
              type="number"
              id="total_quantity"
              autoComplete="on"
              onChange={e => setTotalQuantity(e.target.value)}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available_quantity">
              Cantidad Disponible
            </label>
            <input
              type="number"
              id="available_quantity"
              autoComplete="on"
              onChange={e => setAvailableQuantity(e.target.value)}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Agregar
          </button>
        </form>
      </Modal>
    </div>
  )
}