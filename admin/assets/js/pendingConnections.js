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
			const errorData = await response.json();
			const messages = errorData?.message || ["Unknown error"]; 
			error.innerHTML = messages;
			throw new Error(`Error during signup: ${messages}`); 
		} 
		console.log(connections);
		connections.sort((a, b) => {
			return new Date(b.requestDate) - new Date(a.requestDate);
		})
		connections.forEach((connection) => {
			const user1 = connection.sender;
			const user2 = connection.receiver;
			const requestDate = connection.requestDate

			createConnectionRow(user1, user2, requestDate);
		});
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

function createConnectionRow(connectedUser, otherUser, requestDate){
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
	const connectionDate = document.createElement("td");
	connectionDate.textContent = `${formatDate(requestDate)}`;
		row.appendChild(firstUser);
		row.appendChild(secondUser);
		row.appendChild(connectionDate);
		pendingConnectionsContainer.appendChild(row);
}


fetchUserConnections();

//-------------------------------------------------------------------------------------------------------------------
// handle date format
function formatDate(dateString) {
    const date = new Date(dateString); 
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
