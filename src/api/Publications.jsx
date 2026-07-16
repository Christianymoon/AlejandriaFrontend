export async function getPublicationById(token, publicationId) {
    try {
        const response = await fetch(`/api/publications/${publicationId}`, {
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


export async function getAllPublications(token) {
    try {
        const response = await fetch("/api/publications/", {
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



export async function setPublication(token, publication) {
    try {
        const response = await fetch("/api/publications/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(publication)
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