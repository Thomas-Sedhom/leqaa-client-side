// check auth

const checkAuth = async () => {
   const response = await fetch(`http://localhost:3000/api/v1/auth/getSprintsStatus`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
   })
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      error.innerHTML = messages;
      throw new Error(`Error during checkAuth: ${messages}`);
   }
	const message = await response.json();
	if(message.sprint2 == false)
		window.location.href = "sprint2.html";
	else if(message.sprint1 == false)
		window.location.href = "sprint1.html";
}

checkAuth()
//----------------------------------------------------------------------------------------------------------

const completeRegistration = document.querySelector('.completeRegistration');
const loadingBody = document.querySelector('.loadingBody');
const errorCon = document.createElement('error');
const completeRedData = async (formData) => {
   const response = await fetch('http://localhost:3000/api/v1/auth/sprint3', {
      method: 'POST',
      body: formData,
      credentials: 'include',
   })
   const message = await response.json()
   if (!response.ok || message.status == 400 ) {
      const messages = message?.message || ["Unknown error"];

      error.innerHTML = messages;
      error.style.paddingTop = "20px";
      error.style.paddingBottom = "20px";
      error.style.fontSize = "25px";
      completeRegistration.style.display = 'block';
      loadingBody.style.display = 'none';
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
      window.location.href =
      `sprint4.html`;
   }
   return message;
}  
const completeRegistrationForm = document.getElementById("completeRegistration");
completeRegistrationForm.addEventListener("submit", async (e) => {

   e.preventDefault();
   const skinColor = document.getElementById('skin').value;
   const height = document.getElementById('height').value;
   const weight = document.getElementById('weight').value;
   const nameOfTheApplicantGuardian = document.getElementById('nameOfTheApplicantGuardian').value;
   const relationWithApplicant = document.getElementById('relationWithApplicant').value;
   const phoneOfGuardian = document.getElementById('phoneOfGuardian').value;
   const hobbies = document.getElementById('hobbies').value;
   const habbits = document.getElementById('habbits').value;
   const otherInfo = document.getElementById('otherInfo').value;

   const formData = new FormData();
   formData.append('skinColor', skinColor);
	formData.append('height', height);
   formData.append('weight', weight);
   formData.append('nameOfTheApplicantGuardian', nameOfTheApplicantGuardian);
   formData.append('relationWithApplicant', relationWithApplicant);
   formData.append('phoneOfGuardian', phoneOfGuardian);
   formData.append('hobbies', hobbies);
   formData.append('habbits', habbits);
   formData.append('otherInfo', otherInfo);

	completeRegistration.style.display = 'none';
	loadingBody.style.display = 'grid';
	await completeRedData(formData);
})

const warnings = document.getElementById('warning');
const getWarning = async () => {
   const response = await fetch('http://localhost:3000/api/v1/auth/warning', {
      method: 'GET',
      credentials: 'include',
   })
   const data = await response.text();
   if (data != "") {
      warnings.innerHTML = `
      <span style = "color: black">برجاء استيفاء تلك الملاحظات:</span>
      <br>
      ${data}
      `;
      warnings.style.display = "block";
      const user = await userApi();
      document.getElementById('skin').value = user.skinColor;
      document.getElementById('height').value = user.height;
      document.getElementById('weight').value = user.weight;
      document.getElementById('nameOfTheApplicantGuardian').value = user.nameOfTheApplicantGuardian;
      document.getElementById('relationWithApplicant').value = user.relationWithApplicant;
      document.getElementById('phoneOfGuardian').value = user.phoneOfGuardian;
      document.getElementById('hobbies').value = user.hobbies;
      document.getElementById('habbits').value = user.habits;
      document.getElementById('otherInfo').value = user.otherInfo;
   }
}
getWarning()

//-------------------------------------------------------------------------------------------------------------------
// fetch user data
const userApi = async () => {
   const response = await fetch(`http://localhost:3000/api/v1/user/profile`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
   })

   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`);
   }
   const message = await response.json();
   console.log(message.faceImage)
   return message;
}

//-------------------------------------------------------------------------------------------------------------------
// fetch user data
function convertDate(dateString) {
   const [year, month, day] = dateString.split("/");
   const dateObject = new Date(year, month - 1, day);
   return dateObject;
}

//-------------------------------------------------------------------------------------------------------------------
// update guardian fields
const guardianNameInput = document.getElementById('nameOfTheApplicantGuardian');
const relationInput = document.getElementById('relationWithApplicant');
const phoneInput = document.getElementById('phoneOfGuardian');
const updateGuardianFields = async () => {
	const gender = await getGender();
   if(gender === "ذكر") {
      guardianNameInput.disabled = true;
      relationInput.disabled = true;
      phoneInput.disabled = true;
      guardianNameInput.required = false;
      relationInput.required = false;
      phoneInput.required = false;
   }else{
      guardianNameInput.disabled = false;
      relationInput.disabled = false;
      phoneInput.disabled = false;
      guardianNameInput.required = true;
      relationInput.required = true;
      phoneInput.required = true;
   }
}
updateGuardianFields()

//-------------------------------------------------------------------------------------------------------------------
// getGender

const getGender = async () => {
	const response = await fetch('http://localhost:3000/api/v1/user/gender', {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
   })
   const data = await response.json();
   return data;
}
