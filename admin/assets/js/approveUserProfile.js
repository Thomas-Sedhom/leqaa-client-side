const acceptButton = document.getElementById('acceptButton');
const reject = document.getElementById('reject');
const warning = document.getElementById('warning');


//-------------------------------------------------------------------------------------------------------------------
// Extract id using substring and split
queryString = window.location.search;
if (queryString) {
	const urlParams = new URLSearchParams(queryString.substring(1));
	id = urlParams.get('id');
	if (!id)
		console.error('Email not found in query parameter');
} else {
	console.warn('No query string present in the URL');
}

//-------------------------------------------------------------------------------------------------------------------
// accept event
acceptButton.addEventListener('click', async () => {
	try {
		const response = await fetch(`https//localhost:3000/api/v1/admin/notApprovedUsers/${id}/accept`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include'
		});
		if (!response.ok) {
			const errorData = await response.json();
			const messages = errorData?.message || ["Unknown error"];
			throw new Error(`Error during signup: ${messages}`); 
		}

	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});

//-------------------------------------------------------------------------------------------------------------------
// warning event
warning.addEventListener('click', async () => {
	try {
		const warningInput = document.getElementById('warningInput').value;
		const warning = JSON.stringify({ warningInput });
		const response = await fetch(`http://localhost:3000/api/v1/admin/notApprovedUsers/${id}/warning`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: warning,
			credentials: 'include'
		});
		if (!response.ok) {
			const errorData = await response.json();
			const messages = errorData?.message || ["Unknown error"];
			throw new Error(`Error during signup: ${messages}`);
		}
		await warningEmail(email)
        window.location.href = "warnings.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});
//----------------------------------------------------------------------------------------------
// warning email

const warningEmail = async (email) => {
	const firstName = document.getElementById('firstName');
	const lastName = document.getElementById('lastName');
	const username = firstName.textContent + ' ' + lastName.textContent
	const warningInput = document.getElementById('warningInput').value;
	const res = await fetch("http://localhost:3000/api/v1/admin/warningEmail", {
		method: "POST",
		headers: {
            "Content-Type": "application/json",
        },
		body: JSON.stringify({
			username,
			message: warningInput,
			email,
		}),
        credentials: 'include'
	})
	if (!res.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"];
		throw new Error(`Error during signup: ${messages}`);
	}
}

//-------------------------------------------------------------------------------------------------------------------
// reject event
reject.addEventListener('click', async () => {
	try {
		const response = await fetch(`http//localhost:3000/api/v1/admin/notApprovedUsers/${id}/reject`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include'
		});
		if (!response.ok) {
			const errorData = await response.json();
			const messages = errorData?.message || ["Unknown error"]; 
			throw new Error(`Error during signup: ${messages}`);
		}
		window.location.href = "approveUser.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});
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