const messageTable = document.getElementById("user-messages");
const error = document.getElementById("error");

const contacts = async () => {
	const response = await fetch("http://localhost:3000/api/v1/admin/usersWarning", {
		method: "Get",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"];
		error.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`);
	} else {
		error.innerHTML = "";
	}
	const message = await response.json();
	message.sort((a, b) => {
		if (!a.latestWarningDate) return 1;
		if (!b.latestWarningDate) return -1;
		return new Date(b.latestWarningDate) - new Date(a.latestWarningDate);
	});
	createMessageRow(message);
};

function createMessageRow(users) {
	users.forEach(user => {
		const row = document.createElement("tr");

		const usernameCell = document.createElement("td");

		const userLink = document.createElement("a");
		userLink.href = `userWarning.html?id=${user._id}`;
		userLink.textContent = user.firstName + " " + user.lastName;
		usernameCell.appendChild(userLink)
		row.appendChild(usernameCell);

		const warningCell = document.createElement("td");
		warningCell.textContent = user.warning;
		row.appendChild(warningCell);

		const phoneCell = document.createElement("td");
		phoneCell.textContent = user.phone;
		row.appendChild(phoneCell);

		const warningDateCell = document.createElement("td");
		warningDateCell.textContent = formatDate(user.latestWarningDate);
		row.appendChild(warningDateCell);

		messageTable.appendChild(row)
	})
}
contacts()

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