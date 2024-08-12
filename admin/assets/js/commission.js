const commission = document.getElementById("commission");
const submit = document.getElementById("submit");
const error = document.getElementById("err");
const commissionContainer = document.querySelector(".commission-container");
const loadingBody = document.querySelector(".loadingBody");
let connectionId;
//-------------------------------------------------------------------------------------------------------------------
// Extract id using substring and split
let queryString = window.location.search;
if (queryString) {
	const urlParams = new URLSearchParams(queryString.substring(1));
	connectionId = urlParams.get('id');
	if (!connectionId) 
		console.error('Email not found in query parameter');
} else {
	console.warn('No query string present in the URL');
}

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    commissionContainer.style.display = "none";
    loadingBody.style.display = "grid";
    const commissionValue = commission.value;
    console.log(commissionValue)
    await confirmConnection(connectionId, commissionValue)
});

//-------------------------------------------------------------------------------------------------------------------
// confirm commission

const confirmConnection = async (connectionId, commission) => {
    const res = await fetch(`http://localhost:3000/api/v1/admin/connections/${connectionId}/confirm`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {commission} ),
        credentials: 'include'
    })
	if (!res.ok) {
		const errorData = await res.json();
		const messages = errorData?.message || ["Unknown error"];
		throw new Error(`Error confirming commission: ${messages}`);
	}else{
        alert("Commission confirmed successfully")
        loadingBody.style.display = "none";
        commissionContainer.style.display = "grid";
        commission.value = "";
        error.innerHTML = "";
        window.location.href = "connections.html"
        console.log("Commission confirmed successfully!");
    }
}