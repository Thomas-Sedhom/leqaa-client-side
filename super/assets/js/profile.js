const adminName = document.getElementById("name");
const email = document.getElementById("email");
const role = document.getElementById("role");

const fetchAdminData = async () => {
    const response = await fetch("http://localhost:3000/api/v1/admin/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    console.log(response)
    if (!response.ok) {
        const errorData = await response.json(); // Parse JSON error data
        const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
        throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
    }
    const data = await response.json();
    adminName.innerHTML = data.name;
    email.innerHTML = data.email;
    role.innerHTML = data.role;
}
fetchAdminData()
