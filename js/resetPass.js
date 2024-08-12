const email = document.getElementById("email");
const submit = document.getElementById("submit");
const error = document.getElementById("err");
const resetPass = document.querySelector(".resetPass")
const loadingBody = document.querySelector(".loadingBody")

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    resetPass.style.display = "none";
    loadingBody.style.display = "grid";
    await forgetPassApi()
});

const forgetPassApi = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/auth/forgetPassword`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value
        }),
        credentials: 'include'
    } )
    const res = await response.json()
    console.log(res)
    if (!response.ok || res.status == 400) {
        const messages = res?.message || ["Unknown error"]; 
        error.innerHTML = messages;
        error.style.color = "red";
        error.style.paddingTop = "10px";
        resetPass.style.display = "block";
        loadingBody.style.display = "none";
        throw new Error(`Error during signup: ${messages}`);
    }else
        location.href = `verifyResetPass.html?email=${email.value}`
    resetPass.style.display = "block";
    loadingBody.style.display = "none";
}