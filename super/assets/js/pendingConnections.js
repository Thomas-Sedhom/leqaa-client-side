const pendingConnectionsContainer = document.getElementById("pendingConnections-container");

async function fetchUserConnections() {
	try {
		const response = await fetch("http://localhost:3000/api/v1/admin/pendingRequests",{
			method: "GET",
			headers:{
				"Content-Type": "application/json",

			},
			credentials: 'include'
		}); 
		const connections = await response.json();
		if (!response.ok) {
			const errorData = await response.json(); // Parse JSON error data
			const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
			error.innerHTML = messages;
			throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
		} 
		console.log(connections);

		connections.forEach((connection) => {
			const user1 = connection.sender;
			const user2 = connection.receiver;

			// Assuming user1 is always displayed as the connected user
			const connectedUser = user1;
			const otherUser = user2;

			createConnectionRow(connectedUser, otherUser);
		});
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

function createConnectionRow(connectedUser, otherUser){
	const row = document.createElement("tr");
	const firstUser = document.createElement("td");
	const userProfileLink = document.createElement("a");
	userProfileLink.href = `file:///D:/work/seeko/seeko-front/super/pendingUser.html?id=${connectedUser._id}`;
	userProfileLink.textContent = `${connectedUser.firstName} ${connectedUser.lastName}`
	firstUser.appendChild(userProfileLink)
	const secondUser = document.createElement("td");
	const otherUserProfileLink = document.createElement("a");
	otherUserProfileLink.href = `file:///D:/work/seeko/seeko-front/super/pendingUser.html?id=${otherUser._id}`;
	otherUserProfileLink.textContent = `${otherUser.firstName} ${otherUser.lastName}`
	secondUser.appendChild(otherUserProfileLink)
		row.appendChild(firstUser);
		row.appendChild(secondUser);
		pendingConnectionsContainer.appendChild(row);
}


fetchUserConnections();
