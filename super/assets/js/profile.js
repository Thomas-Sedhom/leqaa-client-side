const adminName = document.getElementById("name");
const email = document.getElementById("email");
const role = document.getElementById("role");

const fetchAdminData = async () => {
    const response = await fetch("http://leqaa.org/api/v1/admin/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!response.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"]; 
        throw new Error(`Error during signup: ${messages}`);
    }
    const data = await response.json();
    adminName.innerHTML = data.name;
    email.innerHTML = data.email;
    role.innerHTML = data.role;
}
fetchAdminData()
