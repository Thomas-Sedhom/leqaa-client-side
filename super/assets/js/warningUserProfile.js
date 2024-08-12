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
		const response = await fetch(`http://localhost:3000/api/v1/admin/notApprovedUsers/${id}/accept`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
			},
			credentials: 'include'
		}); 
		if (!response.ok) {
			const errorData = await response.json(); 
			const messages = errorData?.message || ["Unknown error"]; 
			throw new Error(`Error during signup: ${messages}`);
		} 
        window.location.href = "warnings.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});
//-------------------------------------------------------------------------------------------------------------------
// warning event
warning.addEventListener('click', async () => {
	try {
        const warningInput = document.getElementById('warningInput').value;
        const warning = JSON.stringify({warningInput});
		const response = await fetch(`http://localhost:3000/api/v1/admin/notApprovedUsers/${id}/warning`,{
			method: "POST",
			headers:{
				"Content-Type": "application/json",
			},
            body:  warning,
			credentials: 'include'
		}); 
		if (!response.ok) {
			const errorData = await response.json(); 
			const messages = errorData?.message || ["Unknown error"]; 
			throw new Error(`Error during signup: ${messages}`);
		} 
		const userName = firstName + '' + lastName;
		console.log(userName, email)
		await warningEmail(email, userName)
        // window.location.href = "warnings.html";
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
	const message = res.text();
	console.log(message)
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
		const response = await fetch(`http://localhost:3000/api/v1/admin/notApprovedUsers/${id}/reject`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
			},
			credentials: 'include'
		}); 
		if (!response.ok) {
			const errorData = await response.json(); 
			const messages = errorData?.message || ["Unknown error"]; 
			throw new Error(`Error during signup: ${messages}`); 
		} 
        window.location.href = "warnings.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});