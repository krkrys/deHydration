const url = 'https://localhost:7066/api/Examinations';
const token= localStorage.getItem('token');

export const getExaminations = async () => {
    const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load examination data");
    }
    return await response.json();
}

export const getExamination = async (examinationId)=> {
    const response = await fetch(`${url}/${examinationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load examination data");
    }
    return await response.json();
}

export const deleteExamination = async (examinationId)=> {
    const response = await fetch(`${url}/${examinationId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete examination");
    }
    return response;
}

export const addExamination = async (formData) => {
    const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error("Failed to create examination");
    }
    return await response.json();
}

export const editExamination = async (examinationId,formData) => {
    const response = await fetch(`${url}/${examinationId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error("Failed to update examination");
    }
    return await response.json();
}

export const getPatientExaminations = async (patientId)=> {
    const response = await fetch(`${url}/${patientId}/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load examination data");
    }
    return await response.json();
}