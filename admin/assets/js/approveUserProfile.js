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
        console.log(5)
		const response = await fetch(`http://localhost:3000/api/v1/admin/notApprovedUsers/${id}/accept`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
			},
			credentials: 'include'
		}); 
		if (!response.ok) {
			const errorData = await response.json(); // Parse JSON error data
			const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
			throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
		} 
        window.location.href =
        "file:///D:/work/seeko/seeko-front/admin/approveUser.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});
//-------------------------------------------------------------------------------------------------------------------
// accept event
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
			const errorData = await response.json(); // Parse JSON error data
			const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
			throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
		} 
        window.location.href =
        "file:///D:/work/seeko/seeko-front/admin/approveUser.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});//-------------------------------------------------------------------------------------------------------------------
// accept event
reject.addEventListener('click', async () => {
	try {
        console.log(5)
		const response = await fetch(`http://localhost:3000/api/v1/admin/notApprovedUsers/${id}/reject`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
			},
			credentials: 'include'
		}); 
		if (!response.ok) {
			const errorData = await response.json(); // Parse JSON error data
			const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
			throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
		} 
        window.location.href =
        "file:///D:/work/seeko/seeko-front/admin/approveUser.html";
	} catch (error) {
		console.error("Error fetching connections:", error);
	}
});