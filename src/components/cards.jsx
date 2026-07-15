import React from 'react'

// Cards component: recibe una lista de publicaciones vía props.publications
// Cada publicación tiene la forma:
// {
//   id, name, year, month, type, code,
//   inventory: { total_quantity, available_quantity, updated_at } | null
// }

const Card = ({ pub }) => {
  const { name, year, month, type, code, inventory } = pub || {}
  return (
    <div className="w-auto ui mx-4 flex flex-col gap-2 border-2 rounded-2xl px-4 my-2">
      <h3 className="text-xl lora text-bold text-center uppercase">{name || 'Sin título'}</h3>
      <div className="flex flex-row gap-2">
        <table className="table-auto w-full">
            <thead className="bg-[var(--fg)] text-white">
                <tr>
                    <th className="px-2">Tipo</th>
                    <th className="px-2">Año</th>
                    <th className="px-2">Mes</th>
                    <th className="px-2">Código</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-2">{type || '-'}</td>
                    <td className="px-2">{year || '-'}</td>
                    <td className="px-2">{month || '-'}</td>
                    <td className="px-2">{code || '-'}</td>
                </tr>
            </tbody>
        </table>
      </div>
      

      {inventory ? (
        <div className="flex flex-col gap-1">
            <div><strong>Actualizado:</strong> {inventory.updated_at ? new Date(inventory.updated_at).toLocaleString() : '-'}</div>
            <div className="text-bold ui-bold text-lg text-[var(--fg)]">{inventory.available_quantity ?? 0} / {inventory.total_quantity ?? 0}</div>
        </div>
      ) : (
        <div>Sin inventario aún</div>
      )}
    </div>
  )
}

const Cards = (props) => {
  const { publications = [] } = props
  if (!Array.isArray(publications) || publications.length === 0) {
    return <div>No hay publicaciones</div>
  }

  return (
    <div>
      {publications.map((p) => (
        <Card key={p.id ?? `${p.code}-${p.name}` } pub={p} />
      ))}
    </div>
  )
}



export default Cards
