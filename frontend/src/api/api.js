import axios from "axios"
export const API = import.meta.env.VITE_BACKEND_API


export const adminSignup = async (data) => {
    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const text = await res.text(); // read error safely
        throw new Error(text || "API Error");
    }
    return res.json();
};


export const adminLogin = async (data) => {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const text = await res.text(); // 👈 read raw text first

    let result;
    try {
        result = JSON.parse(text); // parse only if JSON
    } catch (err) {
        throw new Error(err.message || "user not found")
    }
    if (!res.ok) {
        throw new Error(result.message || "Login failed");
    }

    return result;
};


export const getMenu = async () => {
    const res = await axios.get(`${API}/menu`)
    return res.data
}


export const addMenu = async (data) =>
    await fetch(`${API}/menu`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

export const updateMenu = async (id, data) =>
    await fetch(`${API}/menu/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

export const deleteMenu = async (id) =>
    await fetch(`${API}/menu/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then(res => res.json())
