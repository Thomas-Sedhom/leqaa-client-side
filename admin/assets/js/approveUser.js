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
			const errorData = await response.json();
			const messages = errorData?.message || ["Unknown error"];
			error.innerHTML = messages;
			throw new Error(`Error during signup: ${messages}`);
		} 
        const connections = await response.json();
		connections.sort((a, b) => {
			if (!a.registrationDate) return 1;
			if (!b.registrationDate) return -1;
			return new Date(b.registrationDate) - new Date(a.registrationDate);
		});
        return connections;
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
}

async function createUserRow(){
    const connections = await fetchNotApprovedUsers()
    connections.forEach((user) => {
        const row = document.createElement("tr");
        const firstCell = document.createElement("td");
        firstCell.textContent = `${user.firstName} ${user.lastName}`
        const secondCell = document.createElement("td");
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("userButton");
        const userLink = document.createElement("a");
        userLink.href = `apprvedUserPage.html?id=${user._id}`;
        userLink.textContent = `Show Details`
        button.appendChild(userLink);
        secondCell.appendChild(button);
        row.appendChild(firstCell);
        row.appendChild(secondCell);
        usersContainer.appendChild(row);
    })
}
createUserRow();
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