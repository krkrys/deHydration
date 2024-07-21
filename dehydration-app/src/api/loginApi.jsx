const loginUrl = 'https://localhost:7066/api/Login';

export const login = async (data) =>{
    const response = await fetch(`${loginUrl}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return response.text();
}