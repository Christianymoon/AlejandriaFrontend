export function Message({ message, error }) {
  return (
    <>
      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl" role="alert">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}
      {message && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-[var(--fg)] bg-emerald-50 border border-emerald-200 rounded-xl" role="alert">
          <svg className="w-5 h-5 flex-shrink-0 text-[var(--fg)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">¡Éxito!</span> {message}
        </div>
      )}
    </>
  )
}