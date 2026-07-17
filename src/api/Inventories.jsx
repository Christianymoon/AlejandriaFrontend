const BASE_URL = import.meta.env.VITE_API_URL

export async function addInventory(token, publication, inventory) {
    const req = {
        publication_id: parseInt(publication.id),
        total_quantity: parseInt(inventory.total_quantity),
        available_quantity: parseInt(inventory.available_quantity),
    }

    const res = await fetch(BASE_URL + "/api/inventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(req)
    })

    const dat = await res.json()

    if (res.status == 400) {
        await updateInventory(token, publication, inventory)
        return
    }

    if (!res.ok) {
        throw new Error(dat.detail)
    }



    return dat
}

export async function getInventories(token) {
    try {
        const response = await fetch(BASE_URL + "/api/inventory", {
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


export async function updateInventory(token, publication, newInventory) {
    const req = {
        total_quantity: parseInt(newInventory.total_quantity),
        available_quantity: parseInt(newInventory.available_quantity),
    }

    const res = await fetch(BASE_URL + "/api/inventory" + publication.inventory.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(req)
    })

    const dat = await res.json()

    if (!res.ok) {
        throw new Error(dat.detail)
    }

    return dat
}


