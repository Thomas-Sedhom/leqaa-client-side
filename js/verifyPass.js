const otp = document.getElementById("otp");
const submit = document.getElementById("submit");
const error = document.getElementById("err");
const resetPass = document.getElementById("otpVerify")
const loadingBody = document.querySelector(".loadingBody")

//-------------------------------------------------------------------------------------------------------------------
// Extract id using substring and split
let queryString = window.location.search;
if (queryString) {
	const urlParams = new URLSearchParams(queryString.substring(1));
	email = urlParams.get('email');
	if (!email) 
		console.error('Email not found in query parameter');
} else {
	console.warn('No query string present in the URL');
}
//-------------------------------------------------------------------------------------------------------------------

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    resetPass.style.display = "none";
    loadingBody.style.display = "grid";
    console.log(otp)
    await forgetPassApi()
});

const forgetPassApi = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/auth/verifyForgetPassword`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            verificationCode: otp.value
        }),
        credentials: 'include'
    } )
    const res = await response.json()
    if (!response.ok || res.status == 400) {
        const messages = res?.message || ["Unknown error"]; 
        error.innerHTML = messages;
        error.style.color = "red";
        error.style.paddingTop = "10px";
        resetPass.style.display = "block";
        loadingBody.style.display = "none";
        throw new Error(`Error during signup: ${messages}`);
    }else
        location.href = `updatePassword.html?email=${email}`;
    resetPass.style.display = "block";
    loadingBody.style.display = "none";
}