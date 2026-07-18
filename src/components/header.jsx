

export function Title({ Name, children }) {

    return (
        <div className="w-full h-full">
            <h1 className="text-2xl text-[var(--text)] w-fit text-center w-full py-3">{Name}</h1>
            {children}
        </div>
    )

}