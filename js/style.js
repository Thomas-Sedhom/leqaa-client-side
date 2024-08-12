const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const error = document.getElementById("error");
const signupForm = document.getElementById("signup-form");
const loadingBody = document.querySelector(".loadingBody");
const signupCont = document.querySelector(".signup");

// ---------------------------------------------------------------------------------------------------
//signup
signupForm.addEventListener("submit", async (e) => {
   const emailValue = email.value;
   const passwordValue = password.value;
   const phoneValue = phone.value;
   e.preventDefault();
   try {
      const response = await signup(emailValue, passwordValue, phoneValue);
      signupCont.style.display = 'none';
      loadingBody.style.display = 'grid';
      setTimeout(() => {
         signupCont.style.display = 'block';
         loadingBody.style.display = 'none';
      }, 4000)
      await sendVerificationCode(emailValue);
      window.location.href = `verification.html?email=${emailValue}`;
   } catch (error) {
      console.error("Error during signup:", error);
   }
});

const signup = async (email, password, phone) => {
   error.innerHTML = "";
   const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email,
         phone,
         password,
      }),
   });
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"]; 
      error.innerHTML = messages;
      error.style.paddingBottom = "15px"
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
   }
   const message = await response.text();
   return message;
};

const sendVerificationCode = async (email, password) => {
   error.innerHTML = "";
   const response = await fetch("http://localhost:3000/api/v1/auth/resendCode", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email,
      }),
   });
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"]; 
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
   }
   const message = await response.text();
   return message;
};
