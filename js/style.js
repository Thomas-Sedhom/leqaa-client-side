const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const signupForm = document.getElementById("signup-form");



// ---------------------------------------------------------------------------------------------------
//signup
signupForm.addEventListener("submit", async (e) => {
   const emailValue = email.value;
   const passwordValue = password.value;
   e.preventDefault();
   try {
      const response = await signup(emailValue, passwordValue);
      console.log(response);
      window.location.href =
         `file:///D:/work/seeko/seeko-front/verification.html?email=${emailValue}`;
   } catch (error) {
      console.error("Error during signup:", error);
   }
});

const signup = async (email, password) => {
   error.innerHTML = "";
   const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email,
         password,
      }),
   });
   if (!response.ok) {
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   } else {
      error.innerHTML = "";
   }

   const message = await response.text();
   return message;
};
