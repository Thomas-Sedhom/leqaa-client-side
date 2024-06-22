const logout = document.querySelector('.logout');
const logoutIcon = document.querySelector('.logoutIcon');

logout.addEventListener('click', async (e) => {
    const res = await fetch('http://localhost:3000/api/v1/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    if (!res.ok) {
        const errorData = await response.json(); // Parse JSON error data
        const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
        throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
    }
    window.location.href = `file:///D:/work/seeko/seeko-front/index.html`; // Removed setTimeout
})

logoutIcon.addEventListener('click', async (e) => {
    const res = await fetch('http://localhost:3000/api/v1/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    if (!res.ok) {
        const errorData = await response.json(); // Parse JSON error data
        const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
        throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
    }
    window.location.href = `file:///D:/work/seeko/seeko-front/index.html`; // Removed setTimeout
})