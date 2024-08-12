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
	if(message && message.sprint1 == false)
		window.location.href = "sprint1.html"
}
checkAuth()

//----------------------------------------------------------------------------------------------------------
const completeRegistration = document.querySelector('.completeRegistration');
const loadingBody = document.querySelector('.loadingBody');
const errorCon = document.createElement('error');
const completeRedData = async (formData) => {
   const response = await fetch('http://localhost:3000/api/v1/auth/sprint2', {
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
      `sprint3.html`;
   }
   return message;
}  
const completeRegistrationForm = document.getElementById("completeRegistration");
completeRegistrationForm.addEventListener("submit", async (e) => {

   e.preventDefault();
   const club = document.getElementById('club').value;
   const qualification = document.getElementById('qualification').value;
   const school = document.getElementById('school').value;
   const schoolType = document.getElementById('schoolType').value;
   const college = document.getElementById('college').value;
   const university = document.getElementById('university').value;
   const specialization = document.getElementById('specialization').value;
   const religion = document.getElementById('religion').value;
   const formData = new FormData();
   formData.append('club', club);
   formData.append('qualification', qualification);
   formData.append('school', school);
   formData.append('schoolType', schoolType);
   formData.append('college', college);
   formData.append('university', university);
   formData.append('specialization', specialization);
   formData.append('religion', religion);
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
      document.getElementById('club').value = user.club;
      document.getElementById('qualification').value = user.qualification;
      document.getElementById('school').value = user.school;
      document.getElementById('schoolType').value = user.schoolType;
      document.getElementById('college').value = user.college;
      document.getElementById('university').value = user.university;
      document.getElementById('specialization').value = user.specialization;
      document.getElementById('religion').value = user.religion;
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
