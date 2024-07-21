const url = 'https://localhost:7066';
const token= localStorage.getItem('token');

export const getDehydrationLevel = async (examinationId)=> {
    const response = await fetch(`${url}/level/${examinationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to calculate");
    }
    return await response.text();
}

export const getFluidNeeded = async (examinationId)=> {
    const response = await fetch(`${url}/fluid/${examinationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to calculate");
    }
    return await response.json();
}

export const getFluidDetails = async (examinationId)=> {
    const response = await fetch(`${url}/details/${examinationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to calculate");
    }
    return await response.json();
}
