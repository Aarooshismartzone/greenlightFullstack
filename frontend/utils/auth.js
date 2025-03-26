export async function loginUser(email, password, csrfToken) {
    const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

export async function checkAuth() {
    const response = await fetch('http://localhost:8081/api/verify-auth', {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Failed to verify authentication");
    }

    return response.json();
}

//logout user
export async function logoutUser() {
    const response = await fetch('http://localhost:8081/api/logout', {
        method: 'GET',
        credentials: 'include',
    });
    return response.json();
}
