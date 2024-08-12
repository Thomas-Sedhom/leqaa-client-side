const messageTable = document.getElementById("user-messages");
const error = document.getElementById("error");

const contacts = async () => {
   const response = await fetch("http://localhost:3000/api/v1/contact/messages", {
      method: "Get",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
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
   createMessageRow(message);
};

function createMessageRow(users) {
   users.forEach(user => {
      const row = document.createElement("tr");

      const usernameCell = document.createElement("td");
      usernameCell.textContent = user.name;
      row.appendChild(usernameCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      const messageCell = document.createElement("td");
      messageCell.textContent = user.message;
      row.appendChild(messageCell);

      const date = document.createElement("td");
      date.textContent = formatDate(user.contactDate);
      row.appendChild(date);

      const readCell = document.createElement("td");
      const readButton = document.createElement("button");
      readButton.className = "btn btn-success";
      readButton.textContent = "Done";
      readButton.addEventListener("click", async() => {
         readContact(user._id); 
         row.parentNode.removeChild(row);
      });
      readCell.appendChild(readButton);
      row.appendChild(readCell);

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn-delete";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", async() => {
         deleteContact(user._id); 
         row.parentNode.removeChild(row);
      });
      actionCell.appendChild(deleteButton);
         row.appendChild(actionCell);

      messageTable.appendChild(row)
   })
}

const deleteContact = async (id) => {
   const response = await fetch(`http://localhost:3000/api/v1/contact/${id}`, {
      method: "Get",
      headers: {
         "Content-Type": "application/json",
      },
         credentials: 'include'
   });
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"]; 
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
   }
}
const readContact = async (id) => {
   const response = await fetch(`http://localhost:3000/api/v1/contact/isDone/${id}`, {
      method: "Get",
      headers: {
         "Content-Type": "application/json",
      },
         credentials: 'include'
   });
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"]; 
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
   }
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