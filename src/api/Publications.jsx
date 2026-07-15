

export async function getAllPublications(token) {
    try {
        const response = await fetch("/api/publications/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            return { error: response.statusText }
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}

export async function setPublication(token, publication) {

    console.log(token)
    console.log(publication)
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
            return { error: response.statusText }
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}