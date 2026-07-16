export async function addInventory(token, publicationId, inventory) {
    const req = {
        publication_id: parseInt(publicationId),
        total_quantity: parseInt(inventory.total_quantity),
        available_quantity: parseInt(inventory.available_quantity),
    }

    const res = await fetch("/api/inventory/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(req)
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail)
    }

    return res.json()
}

export async function getInventories(token) {
    try {
        const response = await fetch("/api/inventory/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            const err = await response.json()
            throw new Error(err.detail)
        }

        const data = await response.json()
        return data

    } catch (error) {
        throw new Error(error.message)
    }
}


export async function updateInventory(token, inventory) {
    const req = {
        total_quantity: parseInt(inventory.total_quantity),
        available_quantity: parseInt(inventory.available_quantity),
    }

    const res = await fetch("/api/inventory/" + inventory.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(req)
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail)
    }

    return res.json()
}


