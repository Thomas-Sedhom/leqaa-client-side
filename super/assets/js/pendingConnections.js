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
		connections.sort((a, b) => {
			return new Date(b.requestDate) - new Date(a.requestDate);
		})
		console.log(connections)
		connections.forEach((connection) => {
			const user1 = connection.sender;
			const user2 = connection.receiver;
			const requestDate = connection.requestDate;
			const id = connection._id

			createConnectionRow(user1, user2, requestDate, id);
		});
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

function createConnectionRow(connectedUser, otherUser, requestDate, id){
	const row = document.createElement("tr");
	const firstUser = document.createElement("td");
	const userProfileLink = document.createElement("a");
	userProfileLink.href = `pendingUser.html?id=${connectedUser._id}`;
	userProfileLink.textContent = `${connectedUser.firstName} ${connectedUser.lastName}`
	firstUser.appendChild(userProfileLink)
	const secondUser = document.createElement("td");
	const otherUserProfileLink = document.createElement("a");
	otherUserProfileLink.href = `pendingUser.html?id=${otherUser._id}`;
	otherUserProfileLink.textContent = `${otherUser.firstName} ${otherUser.lastName}`
	secondUser.appendChild(otherUserProfileLink)
	const connectionDate = document.createElement("td");
	connectionDate.textContent = `${formatDate(requestDate)}`;
	const reject = document.createElement("td");
	const button = document.createElement("button");
	button.addEventListener("click", async () => {
		await rejectRequest(id);
		row.parentNode.removeChild(row);
	})
	button.textContent = 'Remove';
	button.classList.add("btn", "btn-danger");
	reject.appendChild(button);
	const accept = document.createElement("td");
	const acceptButton = document.createElement("button");
	acceptButton.addEventListener("click", async () => {
		await acceptRequest(connectedUser._id, otherUser._id);
		row.parentNode.removeChild(row);
	})
	acceptButton.textContent = 'Accept';
	acceptButton.classList.add("btn", "btn-success");
	accept.appendChild(acceptButton);
	
	row.appendChild(firstUser);
	row.appendChild(secondUser);
	row.appendChild(connectionDate);
	row.appendChild(reject);
	row.appendChild(accept);
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

//-------------------------------------------------------------------------------------------------------------------
// reject pending request

const rejectRequest = async (pendingId) => {
	const response = await fetch(`http://localhost:3000/api/v1/admin/removePendingRequest/${pendingId}`,{
		method: "GET",
		headers:{
			"Content-Type": "application/json",
		},
		credentials: 'include'
	}); 
	if (!response.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"]; 
		error.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`); 
	} 
}

//-------------------------------------------------------------------------------------------------------------------
// reject pending request
const acceptRequest = async (sender, receiver) => {
	console.log(sender, receiver);
	const response = await fetch(`http://localhost:3000/api/v1/admin/acceptPendingRequest/${sender}/${receiver}`,{
		method: "GET",
		headers:{
			"Content-Type": "application/json",
		},
		credentials: 'include'
	}); 
	if (!response.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"]; 
		error.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`); 
	} 
}

//-------------------------------------------------------------------------------------------------------------------
// export to csv file

function tableToCSV() {

	// Variable to store the final csv data
	let csv_data = [];

	// Get each row data
	let rows = document.getElementsByTagName('tr');
	for (let i = 0; i < rows.length; i++) {

		// Get each column data
		let cols = rows[i].querySelectorAll('td,th');
		// Stores each csv row data
		let csvrow = [];
		for (let j = 0; j < cols.length - 1; j++) {
			if(cols[j].firstElementChild)
				csvrow.push(cols[j].firstElementChild.textContent)
			else{
				csvrow.push(cols[j].innerHTML)
			}
		}

		// Combine each column value with comma
		csv_data.push(csvrow.join(","));
	}

	// Combine each row data with new line character
	csv_data = csv_data.join('\n');

	// Call this function to download csv file  
	downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {

	// Create CSV file object and feed
	// our csv_data into it
	CSVFile = new Blob([csv_data], {
		type: "text/csv"
	});

	// Create to temporary link to initiate
	// download process
	let temp_link = document.createElement('a');

	// Download csv file
	temp_link.download = "GfG.csv";
	let url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = "none";
	document.body.appendChild(temp_link);

	// Automatically click the link to
	// trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}