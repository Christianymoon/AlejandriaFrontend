import { useNavigate } from "react-router"

const Card = ({ pub }) => {
  const { name, year, month, type, code, inventory } = pub || {}

  const available = inventory?.available_quantity ?? 0;
  const total = inventory?.total_quantity ?? 0;

  const navigate = useNavigate()
  const handleAddInventory = (e) => {
    e.stopPropagation()
    navigate(`/inventory/${pub.id}`)
  }

  return (
    <div onClick={(e) => { handleAddInventory(e) }} className="ui cursor-pointer flex flex-col bg-[var(--surface)] border border-[var(--fg)]/10 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden mx-2 my-2 group">
      <div className="bg-[var(--fg)] px-5 py-4 flex justify-between items-center relative overflow-hidden">
        <div className="absolute -right-4 -top-10 opacity-10 transform rotate-12 transition-transform group-hover:rotate-45 duration-700">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="white"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg>
        </div>
        <h3 className="text-lg lora font-bold text-[var(--text)] uppercase tracking-wider truncate pr-4 z-10" title={name || 'Sin título'}>
          {name || 'Sin título'}
        </h3>
        <span className="bg-[var(--surface)] text-[var(--text)] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap z-10 shadow-sm">
          {code || '-'}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-5 flex-grow">
        <div className="grid grid-cols-3 gap-3 bg-[var(--surface-muted)] p-4 rounded-xl border border-[var(--fg)]/10 shadow-inner">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[0.65rem] text-[var(--fg)] uppercase font-bold tracking-widest mb-1 opacity-80">Tipo</span>
            <span className="font-semibold text-[var(--text)] text-sm">{type || '-'}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-r border-[var(--fg)]/10">
            <span className="text-[0.65rem] text-[var(--fg)] uppercase font-bold tracking-widest mb-1 opacity-80">Año</span>
            <span className="font-semibold text-[var(--text)] text-sm">{year || '-'}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[0.65rem] text-[var(--fg)] uppercase font-bold tracking-widest mb-1 opacity-80">Mes</span>
            <span className="font-semibold text-[var(--text)] text-sm">{month || '-'}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--fg)]/10">
          {inventory ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[0.7rem] text-[var(--fg)] uppercase font-bold tracking-widest">Inventario</span>
                <span className="text-xs text-[var(--text)] font-medium mt-0.5">
                  {inventory.updated_at ? new Date(inventory.updated_at).toLocaleDateString() : 'Sin fecha'}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-[var(--fg)]">{available}</span>
                  <span className="text-sm text-[var(--text)] font-bold">/ {total}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-2">
              <span className="text-sm text-[var(--text)] font-medium italic">Sin inventario aún</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Cards = (props) => {
  const { publications = [] } = props
  if (!Array.isArray(publications) || publications.length === 0) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="bg-[var(--surface)] px-8 py-6 rounded-2xl border border-[var(--fg)]/20 shadow-sm text-center">
          <span className="text-[var(--text)] font-medium lora text-lg">No hay publicaciones disponibles</span>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {publications.map((p) => (
        <Card key={p.id ?? `${p.code}-${p.name}`} pub={p} />
      ))}
    </div>
  )
}

export default Cards
