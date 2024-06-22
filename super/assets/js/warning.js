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
		const errorData = await response.json(); // Parse JSON error data
		const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
		error.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
	} else {
		error.innerHTML = "";
	}
	const message = await response.json();
	console.log(message)
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
		userLink.href = `file:///D:/work/seeko/seeko-front/super/userWarning.html?id=${user._id}`;
		userLink.textContent = user.firstName + " " + user.lastName;
		usernameCell.appendChild(userLink)
		row.appendChild(usernameCell);

		const warningCell = document.createElement("td");
		warningCell.textContent = user.warning;
		row.appendChild(warningCell);

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
