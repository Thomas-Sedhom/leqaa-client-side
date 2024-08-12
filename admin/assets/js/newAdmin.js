const email = document.getElementById("email");
const password = document.getElementById("password");
const userRoleSelect = document.getElementById("userRole");
const userName = document.getElementById("name");
const error = document.getElementById("error");
const success = document.getElementById("success");
const signupForm = document.getElementById("signup-form");

// ---------------------------------------------------------------------------------------------------
//signup
signupForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   const emailValue = email.value;
   const passwordValue = password.value;
   const userRoleValue = userRoleSelect.value;
   const userNameValue = userName.value;

   try {
      const response = await signup(emailValue, passwordValue, userRoleValue, userNameValue);
      success.innerHTML = response
      email.value = "";
      password.value = "";
      userName.value = "";
   } catch (error) {
      console.error("Error during signup:", error);
   }
});

const signup = async (email, password, role, name) => {
   error.innerHTML = "";
   const response = await fetch("http://localhost:3000/api/v1/auth/admin", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      name,
      email,
      password,
      role
      }),
      credentials: "include"
   });
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      error.innerHTML = messages;
      success.innerHTML = ""
      throw new Error(`Error during signup: ${messages}`);
   } else {
   error.innerHTML = "";
   }
   const message = await response.text();
   return message;
};