export async function addInventory(publicationId, inventory) {
    const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            publication_id: publicationId,
            total_quantity: inventory.total_quantity,
            available_quantity: inventory.available_quantity,
        })
    })
    if (!res.ok) {
        const error = await res.json()
        return error
    }
    return res.json()
}
