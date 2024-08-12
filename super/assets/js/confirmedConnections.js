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
			const commission = connection.commission
			const connectionId = connection._id
			console.log(commission)
			if(commission)
				createConnectionRow(connectedUser, otherUser, date, commission);
		});
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

function createConnectionRow(connectedUser, otherUser, date, commissionValue){
	const row = document.createElement("tr");

	const firstUser = document.createElement("td");
	const userProfileLink = document.createElement("a");
	userProfileLink.href = `profile.html?id=${connectedUser._id}`;
	userProfileLink.textContent = `${connectedUser.firstName} ${connectedUser.lastName}`
	firstUser.appendChild(userProfileLink)

	const secondUser = document.createElement("td");
	const otherUserProfileLink = document.createElement("a");
	otherUserProfileLink.href = `profile.html?id=${otherUser._id}`;
	otherUserProfileLink.textContent = `${otherUser.firstName} ${otherUser.lastName}`
	secondUser.appendChild(otherUserProfileLink)

	const connectionDate = document.createElement("td");
	connectionDate.textContent = `${date}`;

	const commission = document.createElement("td");
    commission.textContent = `${commissionValue} EGP`;
    commission.style.fontWeight = "bold";
    commission.style.color = "green";
	
		row.appendChild(firstUser);
		row.appendChild(secondUser);
		row.appendChild(connectionDate);
		row.appendChild(commission);
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


//-------------------------------------------------------------------------------------------------------------------
// export to excel sheet

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
		for (let j = 0; j < cols.length; j++) {
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

