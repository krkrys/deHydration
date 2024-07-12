const url = 'https://localhost:7066/api/Patients';

export const getPatients = async () => {
    const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load patient data");
    }

    return await response.json();
}

export const getPatient = async (patientId)=> {
    const response = await fetch(`${url}/${patientId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load patient data");
    }

    return await response.json();
}