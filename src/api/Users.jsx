const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUsers(token) {
    const res = await fetch(`${BASE_URL}/users/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
}

export async function setUser(token, User) {
    try {
        const res = await fetch(BASE_URL + "/users/", {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(User)
        })

        if (!res.ok) {
            throw new Error(res.detail)
        } else {
            return res.json()
        }

    } catch (error) {
        throw new Error(error.message)
    }


}

export async function getRoles() {
    const Roles =
        [{
            id: 1,
            name: "publicador",
            max_publications: 2,
            description: null
        },
        {
            id: 2,
            name: "precursor",
            max_publications: 5,
            description: null
        },
        {
            id: 3,
            name: "admin",
            max_publications: 999,
            description: null
        }]

    return Roles
}