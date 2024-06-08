const usersContainer = document.getElementById("users-container");

async function fetchNotApprovedUsers() {
	try {
		const response = await fetch("http://localhost:3000/api/v1/admin/notApprovedUsers",{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
			},
			credentials: 'include'
		}); 
		if (!response.ok) {
			const errorData = await response.json(); // Parse JSON error data
			const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
			error.innerHTML = messages;
			throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
		} 
        const connections = await response.json();
        console.log(connections);
        return connections;
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

async function createUserRow(){
    const connections = await fetchNotApprovedUsers()
    connections.forEach((user) => {
        console.log(user)
        const row = document.createElement("tr");
        const firstCell = document.createElement("td");
        firstCell.textContent = `${user.firstName} ${user.lastName}`
        const secondCell = document.createElement("td");
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("userButton");
        const userLink = document.createElement("a");
        userLink.href = `file:///D:/work/seeko/seeko-front/super/apprvedUserPage.html?id=${user._id}`;
        userLink.textContent = `Show Details`
        button.appendChild(userLink);
        secondCell.appendChild(button);
        row.appendChild(firstCell);
        row.appendChild(secondCell);
        usersContainer.appendChild(row);
    })
}
createUserRow();
