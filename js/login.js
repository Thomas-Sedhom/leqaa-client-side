const loginForm = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');


const fetchLoginForm = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        }),
        credentials: 'include'
    });
    console.log(response)
    const res = await response.json();
    console.log(res)
    console.log(response.ok)
    if(res.status == 400 || res.statusCode == 400 ){
        const messages = res?.message || ["Unknown error"]; // Handle potential missing message
        console.log(typeof messages)
        if(typeof messages == "object")
            error.innerHTML = messages[0];
        else
            error.innerHTML = messages;
        throw new Error(`Error during login: ${messages}`); // Handle errors gracefully
    }else{
        error.innerHTML = "";
    }
    return res;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    emailValue = email.value;
    passwordValue = password.value;
    console.log(emailValue, typeof emailValue, passwordValue, typeof passwordValue);
    const response = await fetchLoginForm(email, password);
    if (response.role == 'user') {
        if(response.isCompleted == false){
            window.location.href =
			"file:///D:/work/seeko/seeko-front/completeRegistration.html";
        }else if(response.isApprove == false){
            window.location.href =
			"file:///D:/work/seeko/seeko-front/wating.html";
        }else{
            window.location.href =
			"file:///D:/work/seeko/seeko-front/timeLine.html";
        }
    }else if(response.role == 'admin'){
        window.location.href =
        "file:///D:/work/seeko/seeko-front/admin/index.html";
    }else if(response.role == 'super'){
        window.location.href =
        "file:///D:/work/seeko/seeko-front/super/index.html";
    }
})