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

export const deletePatient = async (patientId)=> {
    const response = await fetch(`${url}/${patientId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete patient");
    }
    return response;
}

export const addPatient = async (formData) => {
    const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        throw new Error("Failed to create patient");
    }
    return await response.json();
}

export const editPatient = async (patientId,formData) => {
    const response = await fetch(`${url}/${patientId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        throw new Error("Failed to update patient");
    }
    return await response.json();
}