const connectionsContainer = document.getElementById("connections-container");

async function fetchUserConnections() {
	try {
		const response = await fetch("http://localhost:3000/api/v1/admin/connections",{
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
		console.log(JSON.stringify(connections));

		connections.forEach((connection) => {
			const user1 = connection.userId1;
			const user2 = connection.userId2;

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
	userProfileLink.href = `file:///D:/work/seeko/seeko-front/super/profile.html?id=${connectedUser._id}`;
	userProfileLink.textContent = `${connectedUser.firstName} ${connectedUser.lastName}`
	firstUser.appendChild(userProfileLink)
	const secondUser = document.createElement("td");
	const otherUserProfileLink = document.createElement("a");
	otherUserProfileLink.href = `file:///D:/work/seeko/seeko-front/super/profile.html?id=${otherUser._id}`;
	otherUserProfileLink.textContent = `${otherUser.firstName} ${otherUser.lastName}`
	secondUser.appendChild(otherUserProfileLink)
		row.appendChild(firstUser);
		row.appendChild(secondUser);
		connectionsContainer.appendChild(row);
}

function createConnectionCard(connectedUser, otherUser) {
	const card = document.createElement("div");
	card.className = "connection-card";

	const connectedUserImage = document.createElement("img");
	connectedUserImage.src = connectedUser.fullImage; // Replace with image property name
	card.appendChild(connectedUserImage);

	const connectionInfo = document.createElement("div");
	connectionInfo.className = "connection-info";

	const connectedUserName = document.createElement("h3");
	connectedUserName.textContent = `${connectedUser.firstName} ${connectedUser.lastName}`;
	connectionInfo.appendChild(connectedUserName);

	const otherUserName = document.createElement("p");
	otherUserName.textContent = `Connected with: ${otherUser.firstName} ${otherUser.lastName}`;
	connectionInfo.appendChild(otherUserName);
	const anotherUserImage = document.createElement("img");
	anotherUserImage.src = otherUser.fullImage; // Replace with image property name


	card.appendChild(connectionInfo);
	card.appendChild(anotherUserImage);
	connectionsContainer.appendChild(card);
}

fetchUserConnections();
