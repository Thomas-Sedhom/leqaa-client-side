const adminsContainer = document.getElementById("admins-container");

async function fetchAllAdmins() {
    try {
        const response = await fetch("http://localhost:3000/api/v1/admin/allAdmins", {
            method: "GET",
            headers: {
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
        const admins = await response.json();
        console.log(admins)
        return admins;
    } catch (error) {
        console.error("Error fetching connections:", error);
    }
}

async function createAdminRow() {
    const admins = await fetchAllAdmins()
    admins.forEach((admin) => {
        const row = document.createElement("tr");

        const link = document.createElement("a")
        link.textContent = admin.name;
        link.style.textDecoration = "none";
        const firstCell = document.createElement("td");
        firstCell.appendChild(link);

        const secondCell = document.createElement("td");
        secondCell.textContent = admin.email;
        
        const thirdCell = document.createElement("td");
        thirdCell.textContent = admin.role;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete";
        button.classList.add("btn", "btn-danger");
        button.addEventListener('click', async () => {
            await deleteAdmin(admin._id);
            row.parentNode.removeChild(row);
        });

        const fourthCell = document.createElement("td");
        fourthCell.appendChild(button);

        row.appendChild(firstCell);
        row.appendChild(secondCell);
        row.appendChild(thirdCell);
        row.appendChild(fourthCell);
        adminsContainer.appendChild(row);
    })
}
createAdminRow();

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
// filter item input
function filterItems() {
    const filterInput = document.querySelector('.filter-input');
    const filterText = filterInput.value.toLowerCase();
    const admins = document.querySelectorAll('#admins-container tr td a');
    console.log(admins)
    admins.forEach(admin => {
        const userName = admin.textContent.toLowerCase();
        userName.includes(filterText) ?
        admin.parentNode.parentNode.style.display = 'table-row' :
        admin.parentNode.parentNode.style.display = 'none';
    });
}

//-------------------------------------------------------------------------------------------------------------------
// delete admin api 

const deleteAdmin = async (adminId) => {
    const res = await fetch(`http://localhost:3000/api/v1/admin/deleteAdmin/${adminId}`,{
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await res.json();
        const messages = errorData?.message || ["Unknown error"];
        error.innerHTML = messages;
        throw new Error(`Error during admin deletion: ${messages}`); // Handle errors gracefully
    }
    return res.status;
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