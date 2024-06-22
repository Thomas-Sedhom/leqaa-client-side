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
			const errorData = await response.json(); 
			const messages = errorData?.message || ["Unknown error"]; 
			error.innerHTML = messages;
			throw new Error(`Error during signup: ${messages}`); 
		} 
		console.log(JSON.stringify(connections));
		connections.sort((a, b) => {
			if (!a.connectionDate) return 1;
			if (!b.connectionDate) return -1;
			return new Date(b.connectionDate) - new Date(a.connectionDate);
		});

		connections.forEach((connection) => {
			const user1 = connection.userId1;
			const user2 = connection.userId2;
			const connectionDate = connection.connectionDate

			const connectedUser = user1;
			const otherUser = user2;
			const date = formatDate(connectionDate)

			createConnectionRow(connectedUser, otherUser, date);
		});
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

function createConnectionRow(connectedUser, otherUser, date){
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

	const connectionDate = document.createElement("td");
	connectionDate.textContent = `${date}`;
		row.appendChild(firstUser);
		row.appendChild(secondUser);
		row.appendChild(connectionDate);
		connectionsContainer.appendChild(row);
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
