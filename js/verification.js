const inputElements = document.querySelectorAll(".otp-card-inputs input");
const verifyButton = document.getElementById("verifyButton");
const resend = document.getElementById("resend");
const verificationMessage = document.getElementById("verificationMessage");
const verifyForm = document.getElementById("verify-form");
let email;
let verificationCode = [];
const queryString = window.location.search;

//-------------------------------------------------------------------------------------------------------------------
// Extract email using substring and split
if (queryString) {
	const urlParams = new URLSearchParams(queryString.substring(1));
	email = urlParams.get('email');
} else {
	console.warn('No query string present in the URL');
}

//-------------------------------------------------------------------------------------------------------------------
inputElements.forEach((input) => {
	input.onkeyup = (e) => {
		const currentElement = e.target;
		const currentValue = currentElement.value;
		if (currentValue !== "" && verificationCode.length < 5) {
			verificationCode.push(currentValue);
		} else {
			verifyButton.setAttribute("disabled", true);
		}
		const nextElement = input.nextElementSibling;
		const prevElement = input.previousElementSibling;
		if (prevElement && e.keyCode === 8) {
			if (verificationCode.length > 0) {
				verificationCode.pop();
				verificationCode.pop();
			}
			prevElement.value = "";
			prevElement.focus();
			verifyButton.setAttribute("disabled", true);
			verificationMessage.textContent = ""; 
		} else {
			const reg = /^[0-9]+$/;
			if (!reg.test(currentValue)) {
				currentElement.value = currentElement.value.replace(/\D/g, "");
			} else if (currentValue) {
				if (nextElement) {
					nextElement.focus();
				} else {
					if (verificationCode.length == 5) {
						verifyButton.removeAttribute("disabled");
					}
					verificationMessage.textContent =
						'Code entered. Click "Verify" to submit.'; 
				}
			}
		}
	};
});

//-------------------------------------------------------------------------------------------------------------------
const verifyCode = async (email, verificationCode) => {
	console.log("email",email)
	verificationMessage.innerHTML = "";
	const response = await fetch("http://localhost:3000/api/v1/auth/verify", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			credentials: 'include', 
		},
		body: JSON.stringify({
			email,
			verification: verificationCode,
		}),
		credentials: 'include', 
	})

	if (!response.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"]
		verificationMessage.innerHTML = messages;
		throw new Error(`Error during verify: ${messages}`);
	} else {
		verificationMessage.innerHTML = "";
	}
	const message = await response.text();
	return message;
}

//-------------------------------------------------------------------------------------------------------------------
verifyForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const enteredCode = verificationCode.join("");
	try {
		const response = await verifyCode(email, enteredCode);
		window.location.href =
			"completeRegistration.html";
	} catch (error) {
		console.error("Error during signup:", error);
	}
});
//-------------------------------------------------------------------------------------------------------------------

const resendCode = async(email) => {
	verificationMessage.innerHTML = "";
	const response = await fetch("http://localhost:3000/api/v1/auth/resendCode", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({email})
	})
	if(!response.ok){
		const errorData = await response.json();
		const messages = errorData?.message || ["unknown error"];
		verificationMessage.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`);
	}else{
		verificationMessage.innerHTML = "";
	}
	const message = await response.text();
	return message;
}

resend.onclick = async () => {
	const message = await resendCode(email);
    verificationMessage.innerHTML = message;
    setTimeout(() => {
    verificationMessage.innerHTML = "";
}, 3000);
}
