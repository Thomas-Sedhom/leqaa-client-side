const logout = document.querySelector('.logout');

logout.addEventListener('click', async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/api/v1/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    if (!res.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"];
        throw new Error(`Error during signup: ${messages}`);
    }
    window.location.href = `../login.html`;
})
