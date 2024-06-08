const adminName = document.getElementById("name");
const email = document.getElementById("email");
const role = document.getElementById("role");

const fetchAdminData = async () => {
    const res = await fetch("http://localhost:3000/api/v1/admin/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!response.ok) {
        const errorData = await response.json(); // Parse JSON error data
        const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
        error.innerHTML = messages;
        throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
    }else {
        error.innerHTML = "";
    }
    const data = await response.json();
    adminName.innerHTML = data.name;
    email.innerHTML = data.email;
    role.innerHTML = data.role;
}