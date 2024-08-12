const pass = document.getElementById("pass");
const repPAss = document.getElementById("repPAss");
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

    if(pass.value != repPAss.value) {
        error.innerHTML = "ألرقم السري غير مطابق";
        error.style.color = "red";
        error.style.paddingTop = "10px";
        return;
    }else
        error.innerHTML = "";
    
    if(pass.value.length < 8) {
        error.innerHTML = "ألرقم السري يجب ان يكون 8 رموز او اكثر";
        error.style.color = "red";
        error.style.paddingTop = "10px";
        return;
    }else
        error.innerHTML = "";

    resetPass.style.display = "none";
    loadingBody.style.display = "grid";
    await forgetPassApi()
});

const forgetPassApi = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/auth/updatePassword`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password: pass.value
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
    }else{
        alert("تم تحديث الرقم السري")
        location.href = "login.html"
    }
    resetPass.style.display = "block";
    loadingBody.style.display = "none";
}